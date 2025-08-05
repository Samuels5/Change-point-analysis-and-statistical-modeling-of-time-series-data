import React from "react";

const EventsTimeline = ({ events }) => {
  const categoryColors = {
    Geopolitical: "bg-danger",
    Economic: "bg-success",
    "OPEC Policy": "bg-warning",
    "Economic Sanctions": "bg-info",
    Policy: "bg-secondary",
  };

  const sortedEvents = events.sort(
    (a, b) => new Date(b.Date) - new Date(a.Date)
  );

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">
          <i className="bi bi-calendar-event"></i> Key Events Timeline
        </h5>
      </div>
      <div
        className="card-body"
        style={{ maxHeight: "500px", overflowY: "auto" }}
      >
        <div className="timeline">
          {sortedEvents.map((event, index) => (
            <div key={index} className="timeline-item mb-3">
              <div className="d-flex">
                <div className="flex-shrink-0">
                  <span
                    className={`badge ${
                      categoryColors[event.Category] || "bg-light"
                    } rounded-pill px-2`}
                  >
                    {new Date(event.Date).getFullYear()}
                  </span>
                </div>
                <div className="flex-grow-1 ms-3">
                  <div className="card border-start border-3 border-primary">
                    <div className="card-body py-2">
                      <h6 className="card-title mb-1">{event.Event}</h6>
                      <p className="card-text text-muted mb-1">
                        <small>
                          {new Date(event.Date).toLocaleDateString()}
                        </small>
                      </p>
                      <p className="card-text mb-1">{event.Description}</p>
                      <span
                        className={`badge ${
                          categoryColors[event.Category] || "bg-light"
                        } text-dark`}
                      >
                        {event.Category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card-footer">
        <small className="text-muted">
          Total Events: {events.length} | Geopolitical:{" "}
          {events.filter((e) => e.Category === "Geopolitical").length} |
          Economic: {events.filter((e) => e.Category === "Economic").length} |
          OPEC: {events.filter((e) => e.Category === "OPEC Policy").length}
        </small>
      </div>
    </div>
  );
};

export default EventsTimeline;
