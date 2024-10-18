import React from "react";
import "../../assets/css/Navbar.css";

function Navbar({ title, icon, count }) {
  return (
    <>
      <div className="nav-main">
        <div className="nav-left">
          <span className="material-symbols-outlined">{icon}</span>
          <h2>
            {title} | {count ?? "00"}
          </h2>
        </div>
        <div className="nav-right">
          <h4 className="username">Rishmi</h4>
        </div>
      </div>
    </>
  );
}

export default Navbar;
