import React, { useState } from "react";
import axios from "axios";

const EventImpactAnalyzer = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [impactData, setImpactData] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeEvent = async (eventName) => {
    if (!eventName) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `/api/event-impact/${encodeURIComponent(eventName)}`
      );
      setImpactData(response.data);
    } catch (error) {
      console.error("Error analyzing event:", error);
      setImpactData({ error: "Could not analyze this event" });
    } finally {
      setLoading(false);
    }
  };

  const calculateImpact = () => {
    if (!impactData || !impactData.price_before || !impactData.price_after)
      return null;

    const priceChange = impactData.price_after - impactData.price_before;
    const percentChange = (priceChange / impactData.price_before) * 100;
    const volatilityChange =
      impactData.volatility_after - impactData.volatility_before;

    return {
      priceChange,
      percentChange,
      volatilityChange,
    };
  };

  const impact = calculateImpact();

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">
          <i className="bi bi-search"></i> Event Impact Analyzer
        </h5>
      </div>
      <div className="card-body">
        {/* Event Selector */}
        <div className="mb-3">
          <label className="form-label">Select Event to Analyze</label>
          <select
            className="form-select"
            value={selectedEvent}
            onChange={(e) => {
              setSelectedEvent(e.target.value);
              if (e.target.value) {
                analyzeEvent(e.target.value);
              }
            }}
          >
            <option value="">Choose an event...</option>
            {events.map((event, index) => (
              <option key={index} value={event.Event}>
                {event.Event} ({new Date(event.Date).getFullYear()})
              </option>
            ))}
          </select>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Impact Results */}
        {impactData && !loading && !impactData.error && (
          <div>
            <div className="alert alert-info">
              <h6 className="alert-heading">{impactData.event_info.Event}</h6>
              <p className="mb-1">
                <strong>Date:</strong> {impactData.event_info.Date}
              </p>
              <p className="mb-1">
                <strong>Category:</strong> {impactData.event_info.Category}
              </p>
              <p className="mb-0">{impactData.event_info.Description}</p>
            </div>

            {impact && (
              <div className="row">
                <div className="col-md-6">
                  <div className="card bg-light">
                    <div className="card-body">
                      <h6 className="card-title">Price Impact</h6>
                      <p className="card-text">
                        <strong>Before:</strong> $
                        {impactData.price_before?.toFixed(2)}/barrel
                        <br />
                        <strong>After:</strong> $
                        {impactData.price_after?.toFixed(2)}/barrel
                        <br />
                        <strong>Change:</strong>
                        <span
                          className={
                            impact.percentChange >= 0
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {impact.percentChange >= 0 ? "+" : ""}
                          {impact.percentChange.toFixed(2)}%
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card bg-light">
                    <div className="card-body">
                      <h6 className="card-title">Volatility Impact</h6>
                      <p className="card-text">
                        <strong>Before:</strong>{" "}
                        {impactData.volatility_before?.toFixed(4)}
                        <br />
                        <strong>After:</strong>{" "}
                        {impactData.volatility_after?.toFixed(4)}
                        <br />
                        <strong>Change:</strong>
                        <span
                          className={
                            impact.volatilityChange >= 0
                              ? "text-warning"
                              : "text-success"
                          }
                        >
                          {impact.volatilityChange >= 0 ? "+" : ""}
                          {impact.volatilityChange.toFixed(4)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-3">
              <h6>Interpretation</h6>
              <div className="alert alert-light">
                {impact && (
                  <ul className="mb-0">
                    <li>
                      This event{" "}
                      {impact.percentChange >= 0 ? "increased" : "decreased"}{" "}
                      oil prices by {Math.abs(impact.percentChange).toFixed(2)}%
                      in the 30-day period following the event.
                    </li>
                    <li>
                      Market volatility{" "}
                      {impact.volatilityChange >= 0 ? "increased" : "decreased"}{" "}
                      after the event, indicating{" "}
                      {impact.volatilityChange >= 0
                        ? "higher uncertainty"
                        : "market stabilization"}
                      .
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {impactData && impactData.error && (
          <div className="alert alert-warning">
            <i className="bi bi-exclamation-triangle"></i> {impactData.error}
          </div>
        )}

        {/* Instructions */}
        {!selectedEvent && (
          <div className="text-center text-muted py-4">
            <i className="bi bi-arrow-up fs-1"></i>
            <p className="mt-2">
              Select an event above to analyze its impact on oil prices
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventImpactAnalyzer;
