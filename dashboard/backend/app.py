from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import pandas as pd
import json
import numpy as np
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Load data
def load_data():
    try:
        oil_data = pd.read_csv('../data/processed_oil_data.csv')
        oil_data['Date'] = pd.to_datetime(oil_data['Date'])
        
        events_data = pd.read_csv('../data/processed_events_data.csv')
        events_data['Date'] = pd.to_datetime(events_data['Date'])
        
        with open('../data/model_results.json', 'r') as f:
            model_results = json.load(f)
            
        return oil_data, events_data, model_results
    except Exception as e:
        print(f"Error loading data: {e}")
        return None, None, None

oil_data, events_data, model_results = load_data()

@app.route('/')
def index():
    return jsonify({
        "message": "Brent Oil Change Point Analysis API",
        "endpoints": [
            "/api/oil-data",
            "/api/events", 
            "/api/model-results",
            "/api/price-data",
            "/api/statistics"
        ]
    })

@app.route('/api/oil-data')
def get_oil_data():
    """Get oil price data with optional date filtering"""
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    data = oil_data.copy()
    
    if start_date:
        data = data[data['Date'] >= start_date]
    if end_date:
        data = data[data['Date'] <= end_date]
    
    # Convert to JSON-serializable format
    data_json = data.copy()
    data_json['Date'] = data_json['Date'].dt.strftime('%Y-%m-%d')
    
    return jsonify({
        "data": data_json.to_dict('records'),
        "total_records": len(data_json)
    })

@app.route('/api/events')
def get_events():
    """Get events data with optional category filtering"""
    category = request.args.get('category')
    
    data = events_data.copy()
    
    if category:
        data = data[data['Category'] == category]
    
    # Convert to JSON-serializable format
    data_json = data.copy()
    data_json['Date'] = data_json['Date'].dt.strftime('%Y-%m-%d')
    
    categories = events_data['Category'].unique().tolist()
    
    return jsonify({
        "events": data_json.to_dict('records'),
        "categories": categories,
        "total_events": len(data_json)
    })

@app.route('/api/model-results')
def get_model_results():
    """Get change point model results"""
    return jsonify(model_results)

@app.route('/api/price-data')
def get_price_data():
    """Get formatted price data for charts"""
    data = oil_data.copy()
    
    # Calculate additional metrics
    data['MA_30'] = data['Price'].rolling(window=30).mean()
    data['MA_90'] = data['Price'].rolling(window=90).mean()
    
    # Format for frontend
    price_data = []
    for _, row in data.iterrows():
        price_data.append({
            'date': row['Date'].strftime('%Y-%m-%d'),
            'price': float(row['Price']),
            'log_price': float(row['Log_Price']),
            'log_returns': float(row['Log_Returns']) if not pd.isna(row['Log_Returns']) else None,
            'ma_30': float(row['MA_30']) if not pd.isna(row['MA_30']) else None,
            'ma_90': float(row['MA_90']) if not pd.isna(row['MA_90']) else None
        })
    
    return jsonify({
        "price_data": price_data,
        "change_point_date": model_results['change_point_date']
    })

@app.route('/api/statistics')
def get_statistics():
    """Get statistical summary of the data"""
    price_stats = oil_data['Price'].describe().to_dict()
    returns_stats = oil_data['Log_Returns'].describe().to_dict()
    
    # Event statistics
    event_stats = {
        'total_events': len(events_data),
        'categories': events_data['Category'].value_counts().to_dict(),
        'date_range': {
            'start': events_data['Date'].min().strftime('%Y-%m-%d'),
            'end': events_data['Date'].max().strftime('%Y-%m-%d')
        }
    }
    
    # Volatility analysis
    oil_data_copy = oil_data.copy()
    oil_data_copy['volatility'] = oil_data_copy['Log_Returns'].rolling(window=30).std()
    volatility_stats = oil_data_copy['volatility'].describe().to_dict()
    
    return jsonify({
        "price_statistics": price_stats,
        "returns_statistics": returns_stats,
        "event_statistics": event_stats,
        "volatility_statistics": volatility_stats,
        "data_period": {
            "start": oil_data['Date'].min().strftime('%Y-%m-%d'),
            "end": oil_data['Date'].max().strftime('%Y-%m-%d'),
            "total_days": len(oil_data)
        }
    })

@app.route('/api/event-impact/<event_name>')
def get_event_impact(event_name):
    """Get impact analysis for a specific event"""
    event = events_data[events_data['Event'].str.contains(event_name, case=False)]
    
    if event.empty:
        return jsonify({"error": "Event not found"}), 404
    
    event_date = event.iloc[0]['Date']
    event_info = event.iloc[0].to_dict()
    event_info['Date'] = event_date.strftime('%Y-%m-%d')
    
    # Get price data around the event (30 days before and after)
    start_date = event_date - pd.Timedelta(days=30)
    end_date = event_date + pd.Timedelta(days=30)
    
    event_data = oil_data[
        (oil_data['Date'] >= start_date) & 
        (oil_data['Date'] <= end_date)
    ].copy()
    
    if not event_data.empty:
        pre_event = event_data[event_data['Date'] < event_date]
        post_event = event_data[event_data['Date'] > event_date]
        
        impact_analysis = {
            "event_info": event_info,
            "price_before": float(pre_event['Price'].mean()) if not pre_event.empty else None,
            "price_after": float(post_event['Price'].mean()) if not post_event.empty else None,
            "volatility_before": float(pre_event['Log_Returns'].std()) if not pre_event.empty else None,
            "volatility_after": float(post_event['Log_Returns'].std()) if not post_event.empty else None,
            "price_data": [
                {
                    'date': row['Date'].strftime('%Y-%m-%d'),
                    'price': float(row['Price']),
                    'returns': float(row['Log_Returns']) if not pd.isna(row['Log_Returns']) else None
                }
                for _, row in event_data.iterrows()
            ]
        }
        
        return jsonify(impact_analysis)
    else:
        return jsonify({"error": "No price data available for this event period"}), 404

if __name__ == '__main__':
    print("Starting Brent Oil Analysis API...")
    print("Available endpoints:")
    print("- http://localhost:5000/api/oil-data")
    print("- http://localhost:5000/api/events")
    print("- http://localhost:5000/api/model-results")
    print("- http://localhost:5000/api/price-data")
    print("- http://localhost:5000/api/statistics")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
