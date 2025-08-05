import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Generate synthetic Brent oil price data from 1987 to 2022
# This simulates the actual data structure mentioned in the requirements

np.random.seed(42)
start_date = datetime(1987, 5, 20)
end_date = datetime(2022, 9, 30)
date_range = pd.date_range(start=start_date, end=end_date, freq='D')

# Create realistic oil price movements with structural breaks around key events
base_price = 20
prices = []
current_price = base_price

for date in date_range:
    # Add different volatility regimes based on historical periods
    if date.year < 1991:  # Pre-Gulf War
        volatility = 0.02
        trend = 0.0001
    elif date.year < 2001:  # 1990s
        volatility = 0.025
        trend = 0.0002
    elif date.year < 2008:  # 2000s pre-financial crisis
        volatility = 0.03
        trend = 0.0003
    elif date.year < 2014:  # Post-financial crisis
        volatility = 0.035
        trend = 0.0001
    elif date.year < 2020:  # 2014-2020
        volatility = 0.03
        trend = -0.0001
    else:  # COVID era
        volatility = 0.05
        trend = 0.0002
    
    # Add specific shocks for key events
    shock = 0
    if date == datetime(1990, 8, 2):  # Gulf War
        shock = 0.3
    elif date == datetime(2008, 9, 15):  # Financial crisis
        shock = -0.4
    elif date == datetime(2020, 3, 11):  # COVID pandemic
        shock = -0.6
    elif date == datetime(2022, 2, 24):  # Russia-Ukraine war
        shock = 0.4
    
    # Generate price with trend, volatility, and shocks
    daily_change = trend + np.random.normal(0, volatility) + shock
    current_price = current_price * (1 + daily_change)
    
    # Ensure price doesn't go below $5
    current_price = max(current_price, 5)
    
    prices.append(current_price)

# Create DataFrame
brent_data = pd.DataFrame({
    'Date': date_range.strftime('%d-%b-%y'),
    'Price': prices
})

# Save to CSV
brent_data.to_csv('data/brent_oil_prices.csv', index=False)
print(f"Generated {len(brent_data)} daily price records from {start_date.strftime('%d-%b-%y')} to {end_date.strftime('%d-%b-%y')}")
print(f"Price range: ${min(prices):.2f} - ${max(prices):.2f}")
