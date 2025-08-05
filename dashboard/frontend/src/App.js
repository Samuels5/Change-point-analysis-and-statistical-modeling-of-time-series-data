import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Components
import PriceChart from "./components/PriceChart";
import EventsTimeline from "./components/EventsTimeline";
import StatisticsPanel from "./components/StatisticsPanel";
import ChangePointInfo from "./components/ChangePointInfo";
import EventImpactAnalyzer from "./components/EventImpactAnalyzer";

function App() {
  const [priceData, setPriceData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [modelResults, setModelResults] = useState({});
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDateRange, setSelectedDateRange] = useState({
    start: "2000-01-01",
    end: "2022-12-31",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const [priceResponse, eventsResponse, modelResponse, statsResponse] =
        await Promise.all([
          axios.get("/api/price-data"),
          axios.get("/api/events"),
          axios.get("/api/model-results"),
          axios.get("/api/statistics"),
        ]);

      setPriceData(priceResponse.data.price_data);
      setEventsData(eventsResponse.data.events);
      setModelResults(modelResponse.data);
      setStatistics(statsResponse.data);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterDataByDate = (data) => {
    return data.filter((item) => {
      const itemDate = new Date(item.date);
      const startDate = new Date(selectedDateRange.start);
      const endDate = new Date(selectedDateRange.end);
      return itemDate >= startDate && itemDate <= endDate;
    });
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Header */}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            <i className="bi bi-graph-up"></i> Brent Oil Change Point Analysis
            Dashboard
          </span>
          <small className="text-light">
            Birhan Energies - Data-Driven Energy Intelligence
          </small>
        </div>
      </nav>

      {/* Navigation Tabs */}
      <div className="container-fluid mt-3">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "analysis" ? "active" : ""}`}
              onClick={() => setActiveTab("analysis")}
            >
              Change Point Analysis
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "events" ? "active" : ""}`}
              onClick={() => setActiveTab("events")}
            >
              Event Impact
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "statistics" ? "active" : ""
              }`}
              onClick={() => setActiveTab("statistics")}
            >
              Statistics
            </button>
          </li>
        </ul>

        {/* Date Range Filter */}
        <div className="row mt-3 mb-3">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h6 className="card-title">Date Range Filter</h6>
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={selectedDateRange.start}
                      onChange={(e) =>
                        setSelectedDateRange({
                          ...selectedDateRange,
                          start: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={selectedDateRange.end}
                      onChange={(e) =>
                        setSelectedDateRange({
                          ...selectedDateRange,
                          end: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "overview" && (
            <div className="row">
              <div className="col-md-8">
                <PriceChart
                  data={filterDataByDate(priceData)}
                  changePointDate={modelResults.change_point_date}
                  events={eventsData}
                />
              </div>
              <div className="col-md-4">
                <ChangePointInfo modelResults={modelResults} />
              </div>
            </div>
          )}

          {activeTab === "analysis" && (
            <div className="row">
              <div className="col-12">
                <PriceChart
                  data={filterDataByDate(priceData)}
                  changePointDate={modelResults.change_point_date}
                  events={eventsData}
                  showReturns={true}
                />
              </div>
              <div className="col-12 mt-3">
                <ChangePointInfo modelResults={modelResults} detailed={true} />
              </div>
            </div>
          )}

          {activeTab === "events" && (
            <div className="row">
              <div className="col-md-6">
                <EventsTimeline events={eventsData} />
              </div>
              <div className="col-md-6">
                <EventImpactAnalyzer events={eventsData} />
              </div>
            </div>
          )}

          {activeTab === "statistics" && (
            <div className="row">
              <div className="col-12">
                <StatisticsPanel statistics={statistics} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light mt-5 py-3">
        <div className="container-fluid text-center">
          <small>
            © 2025 Birhan Energies - Change Point Analysis Dashboard | Data: May
            1987 - Sep 2022 | Model: Bayesian Change Point Detection
          </small>
        </div>
      </footer>
    </div>
  );
}

export default App;
