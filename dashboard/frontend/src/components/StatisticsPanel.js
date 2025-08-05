import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const StatisticsPanel = ({ statistics }) => {
  if (!statistics || Object.keys(statistics).length === 0) {
    return <div>Loading statistics...</div>;
  }

  const {
    price_statistics,
    returns_statistics,
    event_statistics,
    volatility_statistics,
    data_period,
  } = statistics;

  // Prepare data for charts
  const eventCategoryData = Object.entries(
    event_statistics.categories || {}
  ).map(([category, count]) => ({
    category,
    count,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  const formatNumber = (value, decimals = 2) => {
    return value?.toFixed(decimals);
  };

  return (
    <div className="row">
      {/* Data Overview */}
      <div className="col-md-12 mb-4">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">Dataset Overview</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-3">
                <div className="text-center p-3 bg-primary text-white rounded">
                  <h3>{data_period.total_days}</h3>
                  <p className="mb-0">Trading Days</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center p-3 bg-success text-white rounded">
                  <h3>{event_statistics.total_events}</h3>
                  <p className="mb-0">Key Events</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center p-3 bg-warning text-white rounded">
                  <h3>{data_period.start}</h3>
                  <p className="mb-0">Start Date</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center p-3 bg-info text-white rounded">
                  <h3>{data_period.end}</h3>
                  <p className="mb-0">End Date</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Statistics */}
      <div className="col-md-6 mb-4">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">Price Statistics (USD/barrel)</h5>
          </div>
          <div className="card-body">
            <table className="table table-sm">
              <tbody>
                <tr>
                  <td>
                    <strong>Mean</strong>
                  </td>
                  <td>${formatNumber(price_statistics.mean)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Standard Deviation</strong>
                  </td>
                  <td>${formatNumber(price_statistics.std)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Minimum</strong>
                  </td>
                  <td>${formatNumber(price_statistics.min)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Maximum</strong>
                  </td>
                  <td>${formatNumber(price_statistics.max)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>25th Percentile</strong>
                  </td>
                  <td>${formatNumber(price_statistics["25%"])}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Median</strong>
                  </td>
                  <td>${formatNumber(price_statistics["50%"])}</td>
                </tr>
                <tr>
                  <td>
                    <strong>75th Percentile</strong>
                  </td>
                  <td>${formatNumber(price_statistics["75%"])}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Returns Statistics */}
      <div className="col-md-6 mb-4">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">Daily Returns Statistics</h5>
          </div>
          <div className="card-body">
            <table className="table table-sm">
              <tbody>
                <tr>
                  <td>
                    <strong>Mean</strong>
                  </td>
                  <td>{formatNumber(returns_statistics.mean, 6)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Standard Deviation</strong>
                  </td>
                  <td>{formatNumber(returns_statistics.std, 4)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Skewness</strong>
                  </td>
                  <td>{formatNumber(returns_statistics.min, 4)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Minimum</strong>
                  </td>
                  <td>{formatNumber(returns_statistics.min, 4)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Maximum</strong>
                  </td>
                  <td>{formatNumber(returns_statistics.max, 4)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>25th Percentile</strong>
                  </td>
                  <td>{formatNumber(returns_statistics["25%"], 4)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Median</strong>
                  </td>
                  <td>{formatNumber(returns_statistics["50%"], 4)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Event Categories Chart */}
      <div className="col-md-6 mb-4">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">Events by Category</h5>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={eventCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, count }) => `${category}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {eventCategoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Volatility Statistics */}
      <div className="col-md-6 mb-4">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">Volatility Statistics (30-day)</h5>
          </div>
          <div className="card-body">
            <table className="table table-sm">
              <tbody>
                <tr>
                  <td>
                    <strong>Mean Volatility</strong>
                  </td>
                  <td>{formatNumber(volatility_statistics.mean, 4)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Volatility Std</strong>
                  </td>
                  <td>{formatNumber(volatility_statistics.std, 4)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Min Volatility</strong>
                  </td>
                  <td>{formatNumber(volatility_statistics.min, 4)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Max Volatility</strong>
                  </td>
                  <td>{formatNumber(volatility_statistics.max, 4)}</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-3">
              <h6>Key Insights</h6>
              <ul className="list-unstyled">
                <li>
                  <i className="bi bi-check-circle text-success"></i> Dataset
                  spans over {Math.round(data_period.total_days / 365)} years
                </li>
                <li>
                  <i className="bi bi-check-circle text-success"></i> Captures
                  major market events and crises
                </li>
                <li>
                  <i className="bi bi-check-circle text-success"></i>{" "}
                  High-frequency daily data for robust analysis
                </li>
                <li>
                  <i className="bi bi-check-circle text-success"></i> Diverse
                  event categories for comprehensive impact study
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;
