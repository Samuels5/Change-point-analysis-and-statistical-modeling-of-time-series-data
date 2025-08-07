# Change Point Analysis and Statistical Modeling of Time Series Data

## Project Overview

This project implements Bayesian change point detection to analyze how major geopolitical and economic events affect Brent oil prices. Developed for **Birhan Energies**, this analysis provides data-driven insights for investors, policymakers, and energy companies.

## Business Objective

Study how important events affect Brent oil prices by:

- Detecting structural breaks in oil price behavior using Bayesian methods
- Associating change points with major geopolitical and economic events
- Quantifying the impact of events on price dynamics and volatility
- Providing actionable intelligence for decision-making

## Key Features

### 📊 Core Analysis

- **Bayesian Change Point Detection** using PyMC3
- **Time Series Analysis** with stationarity testing and volatility clustering
- **Event Impact Quantification** with statistical confidence measures
- **Regime Identification** for before/after structural breaks

### 🎯 Interactive Dashboard

- **Real-time Visualization** of oil prices and change points
- **Event Timeline** with category-based filtering
- **Impact Analyzer** for individual event analysis
- **Statistical Dashboard** with comprehensive metrics

## Project Structure

```
├── data/
│   ├── brent_oil_prices.csv      # Daily Brent oil prices (1987-2022)
│   ├── key_events.csv            # Major geopolitical/economic events
│   ├── processed_oil_data.csv    # Processed data for dashboard
│   ├── processed_events_data.csv # Processed events for dashboard
│   └── model_results.json        # Change point analysis results
│
├── notebooks/
│   └── brent_oil_changepoint_analysis.ipynb  # Main analysis notebook
│
├── src/
│   └── generate_sample_data.py   # Data generation script
│
├── dashboard/
│   ├── backend/
│   │   ├── app.py               # Flask API server
│   │   └── requirements.txt     # Python dependencies
│   └── frontend/
│       ├── src/                 # React components
│       ├── public/              # Static files
│       └── package.json         # Node.js dependencies
│
└── README.md
```

## Key Findings

### 🎯 Statistical Results

- **Change Point Detected**: Statistically significant structural break identified
- **Regime Shifts**: Clear evidence of different volatility and return regimes
- **Event Association**: Strong temporal correlation between events and market changes
- **Quantified Impact**: Measurable changes in expected returns and volatility

### 📈 Business Impact

- **Risk Management**: Enhanced understanding of volatility regime changes
- **Investment Strategy**: Data-driven insights for timing and positioning
- **Policy Planning**: Evidence-based analysis for energy security decisions

## Technologies Used

### Backend & Analysis

- **Python 3.8+**: Core programming language
- **PyMC3**: Bayesian statistical modeling
- **Pandas & NumPy**: Data manipulation and analysis
- **Matplotlib & Seaborn**: Data visualization
- **Statsmodels**: Time series analysis
- **Flask**: API backend
- **Arviz**: Bayesian analysis diagnostics

### Frontend Dashboard

- **React 18**: User interface framework
- **Recharts**: Interactive data visualization
- **Bootstrap 5**: Responsive design
- **Axios**: API communication

## Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/Samuels5/Change-point-analysis-and-statistical-modeling-of-time-series-data.git
cd Change-point-analysis-and-statistical-modeling-of-time-series-data
```

### 2. Backend Setup

```bash
cd dashboard/backend
pip install -r requirements.txt
python app.py
```

### 3. Frontend Setup

```bash
cd dashboard/frontend
npm install
npm start
```

### 4. Run Analysis

```bash
cd notebooks
jupyter notebook brent_oil_changepoint_analysis.ipynb
```

## Usage

### Running the Analysis

1. Open the Jupyter notebook: `notebooks/brent_oil_changepoint_analysis.ipynb`
2. Execute cells sequentially to:
   - Load and preprocess data
   - Perform exploratory data analysis
   - Run Bayesian change point detection
   - Analyze event associations
   - Generate comprehensive visualizations

### Using the Dashboard

1. Start the Flask backend: `python dashboard/backend/app.py`
2. Start the React frontend: `npm start` in `dashboard/frontend/`
3. Access dashboard at `http://localhost:3000`
4. Explore different tabs:
   - **Overview**: Price charts with change points
   - **Analysis**: Detailed statistical results
   - **Events**: Timeline and impact analysis
   - **Statistics**: Comprehensive data metrics

## API Endpoints

- `GET /api/oil-data` - Oil price data with filtering
- `GET /api/events` - Events data with category filtering
- `GET /api/model-results` - Change point analysis results
- `GET /api/price-data` - Formatted data for charts
- `GET /api/statistics` - Statistical summaries
- `GET /api/event-impact/<event_name>` - Individual event impact analysis

## Key Events Analyzed

| Event                    | Date       | Category     | Impact                |
| ------------------------ | ---------- | ------------ | --------------------- |
| Gulf War Invasion        | 1990-08-02 | Geopolitical | Oil supply disruption |
| September 11 Attacks     | 2001-09-11 | Geopolitical | Market uncertainty    |
| Lehman Brothers Collapse | 2008-09-15 | Economic     | Financial crisis      |
| Arab Spring              | 2010-12-17 | Geopolitical | Regional instability  |
| COVID-19 Pandemic        | 2020-03-11 | Economic     | Demand collapse       |
| Russia-Ukraine War       | 2022-02-24 | Geopolitical | Supply concerns       |

## Results Summary

### Statistical Confidence

- **Change Point Detection**: High posterior probability for structural break
- **Parameter Changes**: Significant shifts in mean returns and volatility
- **Model Convergence**: Excellent MCMC diagnostics (R-hat ≈ 1.0)

### Business Insights

- **Volatility Regimes**: Clear identification of low/high volatility periods
- **Event Impact**: Quantified price and volatility changes around events
- **Predictive Power**: Strong evidence for structural market changes

## Limitations & Future Work

### Current Limitations

- Single change point model (could be extended to multiple change points)
- Focus on 15 major events (additional events could be included)
- Historical analysis (real-time detection system needed)

### Future Enhancements

- **Multiple Change Points**: Detect several structural breaks
- **Multivariate Models**: Include GDP, inflation, exchange rates
- **Real-time Monitoring**: Live change point detection system
- **Sector Analysis**: Extend to other energy commodities

## Contributors

**Birhan Energies Data Science Team**

- Analysis: Bayesian change point detection and statistical modeling
- Dashboard: Interactive visualization and API development
- Business Intelligence: Strategic insights and recommendations

## License

This project is developed for **Birhan Energies** as part of a comprehensive energy market analysis initiative.

## Contact

For questions about this analysis or collaboration opportunities:

- **Organization**: Birhan Energies
- **Project**: Change Point Analysis of Energy Markets
- **Focus**: Data-driven insights for energy sector stakeholders

---

_"Delivering actionable intelligence that supports decision-making processes for investors, policymakers, and energy companies."_ - Birhan Energies Mission
