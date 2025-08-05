import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const PriceChart = ({ data, changePointDate, events, showReturns = false }) => {
  // Format data for chart
  const chartData = data.map((item) => ({
    ...item,
    date: new Date(item.date).getTime(), // Convert to timestamp for better handling
  }));

  const formatDate = (tickItem) => {
    return new Date(tickItem).toLocaleDateString();
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const date = new Date(label).toLocaleDateString();
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="mb-1">
            <strong>Date:</strong> {date}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="mb-1" style={{ color: entry.color }}>
              <strong>{entry.name}:</strong> {entry.value?.toFixed(4)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">
          {showReturns
            ? "Brent Oil Log Returns with Change Point"
            : "Brent Oil Prices with Change Point"}
        </h5>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="date"
              type="number"
              scale="time"
              domain={["dataMin", "dataMax"]}
              tickFormatter={formatDate}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />

            {!showReturns ? (
              <>
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#2563eb"
                  strokeWidth={1.5}
                  dot={false}
                  name="Brent Price (USD/barrel)"
                />
                <Line
                  type="monotone"
                  dataKey="ma_30"
                  stroke="#dc2626"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                  name="30-day MA"
                />
              </>
            ) : (
              <Line
                type="monotone"
                dataKey="log_returns"
                stroke="#dc2626"
                strokeWidth={1}
                dot={false}
                name="Log Returns"
              />
            )}

            {/* Change Point Reference Line */}
            {changePointDate && (
              <ReferenceLine
                x={new Date(changePointDate).getTime()}
                stroke="#ef4444"
                strokeWidth={3}
                label={{ value: "Change Point", position: "top" }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>

        {/* Event Markers Legend */}
        <div className="mt-3">
          <small className="text-muted">
            <strong>Legend:</strong> Red vertical line = Detected Change Point |
            Dashed lines = Key geopolitical and economic events
          </small>
        </div>
      </div>
    </div>
  );
};

export default PriceChart;
