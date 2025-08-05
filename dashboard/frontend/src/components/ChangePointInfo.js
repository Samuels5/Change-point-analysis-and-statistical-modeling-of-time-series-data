import React from "react";

const ChangePointInfo = ({ modelResults, detailed = false }) => {
  if (!modelResults || Object.keys(modelResults).length === 0) {
    return (
      <div className="card">
        <div className="card-body">
          <p>Loading model results...</p>
        </div>
      </div>
    );
  }

  const formatPercentage = (value) => {
    return (value * 100).toFixed(2) + "%";
  };

  const formatNumber = (value, decimals = 4) => {
    return value?.toFixed(decimals);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">
          <i className="bi bi-graph-up-arrow"></i> Change Point Analysis Results
        </h5>
      </div>
      <div className="card-body">
        {/* Key Finding */}
        <div className="alert alert-info">
          <h6 className="alert-heading">Key Finding</h6>
          <p className="mb-0">
            Significant structural break detected on{" "}
            <strong>{modelResults.change_point_date}</strong>
          </p>
        </div>

        {/* Before/After Comparison */}
        <div className="row">
          <div className="col-md-6">
            <h6>Before Change Point</h6>
            <ul className="list-unstyled">
              <li>
                <strong>Daily Return:</strong>{" "}
                {formatNumber(modelResults.mu_before)}
              </li>
              <li>
                <strong>Volatility:</strong>{" "}
                {formatNumber(modelResults.sigma_before)}
              </li>
              <li>
                <strong>Annual Return:</strong>{" "}
                {formatNumber(modelResults.annual_return_before, 2)}%
              </li>
              <li>
                <strong>Annual Volatility:</strong>{" "}
                {formatNumber(modelResults.annual_volatility_before, 2)}%
              </li>
            </ul>
          </div>
          <div className="col-md-6">
            <h6>After Change Point</h6>
            <ul className="list-unstyled">
              <li>
                <strong>Daily Return:</strong>{" "}
                {formatNumber(modelResults.mu_after)}
              </li>
              <li>
                <strong>Volatility:</strong>{" "}
                {formatNumber(modelResults.sigma_after)}
              </li>
              <li>
                <strong>Annual Return:</strong>{" "}
                {formatNumber(modelResults.annual_return_after, 2)}%
              </li>
              <li>
                <strong>Annual Volatility:</strong>{" "}
                {formatNumber(modelResults.annual_volatility_after, 2)}%
              </li>
            </ul>
          </div>
        </div>

        {/* Statistical Confidence */}
        <div className="mt-3">
          <h6>Statistical Confidence</h6>
          <div className="progress mb-2">
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${modelResults.prob_mu_increase * 100}%` }}
            >
              {formatPercentage(modelResults.prob_mu_increase)}
            </div>
          </div>
          <small className="text-muted">Probability of return increase</small>

          <div className="progress mb-2 mt-2">
            <div
              className="progress-bar bg-warning"
              role="progressbar"
              style={{ width: `${modelResults.prob_sigma_increase * 100}%` }}
            >
              {formatPercentage(modelResults.prob_sigma_increase)}
            </div>
          </div>
          <small className="text-muted">
            Probability of volatility increase
          </small>
        </div>

        {detailed && (
          <div className="mt-4">
            <h6>Interpretation</h6>
            <div className="alert alert-light">
              <p className="mb-2">
                <strong>Impact Magnitude:</strong> The change point analysis
                reveals a structural shift in market behavior.
              </p>
              <ul className="mb-0">
                <li>
                  Expected return changed from{" "}
                  {formatNumber(modelResults.annual_return_before, 2)}% to{" "}
                  {formatNumber(modelResults.annual_return_after, 2)}% annually
                </li>
                <li>
                  Volatility changed from{" "}
                  {formatNumber(modelResults.annual_volatility_before, 2)}% to{" "}
                  {formatNumber(modelResults.annual_volatility_after, 2)}%
                  annually
                </li>
                <li>
                  This suggests a fundamental shift in market dynamics around{" "}
                  {modelResults.change_point_date}
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Business Implications */}
        <div className="mt-3">
          <h6>Business Implications</h6>
          <div className="row">
            <div className="col-md-4">
              <div className="text-center p-2 bg-light rounded">
                <i className="bi bi-trending-up fs-4 text-primary"></i>
                <p className="mb-0 mt-1">
                  <small>Risk Management</small>
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center p-2 bg-light rounded">
                <i className="bi bi-graph-up fs-4 text-success"></i>
                <p className="mb-0 mt-1">
                  <small>Investment Strategy</small>
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center p-2 bg-light rounded">
                <i className="bi bi-shield-check fs-4 text-warning"></i>
                <p className="mb-0 mt-1">
                  <small>Policy Planning</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePointInfo;
