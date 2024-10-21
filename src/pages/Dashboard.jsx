import React from "react";
import "../assets/css/Dashboard.css";
import Navbar from "../components/common/Navbar";

const mockData = {
  vehicles: 120,
  inquiries: 45,
  users: 300,
};

export default function Dashboard() {
  return (
    <>
      <Navbar title={"Dashboard"} icon={"dashboard"}/>
      <div className="dashboard-container">
        <h2 className="dashboard-title">Dashboard Overview</h2>
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3 className="card-title">Vehicles</h3>
            <p className="card-value">{mockData.vehicles}</p>
          </div>
          <div className="dashboard-card">
            <h3 className="card-title">Inquiries</h3>
            <p className="card-value">{mockData.inquiries}</p>
          </div>
          <div className="dashboard-card">
            <h3 className="card-title">Users</h3>
            <p className="card-value">{mockData.users}</p>
          </div>
        </div>
      </div>
    </>
  );
}
