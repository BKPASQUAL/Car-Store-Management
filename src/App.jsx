import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./components/common/Home";
import Dashboard from "./pages/Dashboard";
import CarStore from "./pages/CarStore";
import "bootstrap/dist/css/bootstrap.min.css";
import AddCar from "./components/model/AddCar";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="dashbourd" element={<Dashboard />} />
          <Route path="carStore" element={<CarStore />} />
          <Route path="carStore/addCar" element={<AddCar />} />
        </Route>
      </Routes>
    </div>
  );
}
