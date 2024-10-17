import React from "react";
import { Divider } from "rsuite";
import "../../assets/css/Navbar.css";

function Navbar({ title }) {  
  return (
    <>
      <div className="nav-main">
        <div className="nav-left">
          <h2>{title}</h2>
        </div>
        <div className="nav-right">
          <h4 className="username">Rishmi</h4>
        </div>
      </div>
      {/* <Divider className="nav-divider" /> */}
    </>
  );
}

export default Navbar;
