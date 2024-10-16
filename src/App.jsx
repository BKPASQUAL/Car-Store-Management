import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";


export default function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
    </div>
  );
}