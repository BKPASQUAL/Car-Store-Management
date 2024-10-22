import React from "react";
import "../../assets/css/Navbar.css";
import { useGetSignedUserQuery } from "../../store/api/userApi";
import dummy from "../../assets/images/dummy.jpg";

function Navbar({ title, icon, count }) {
  const { data: getSingedUser } = useGetSignedUserQuery();
  console.log("getSingedUser", getSingedUser);

  // Fallback to dummy image if no user image is available
  const userImage = getSingedUser?.payload?.image || dummy;

  return (
    <>
      <div className="nav-main">
        <div className="nav-left">
          <span className="material-symbols-outlined">{icon}</span>
          <h2>
            {title}
            {count !== undefined
              ? ` | ${count.toString().padStart(2, "0")}`
              : ""}
          </h2>
        </div>
        <div className="nav-right">
          {/* Display user's image */}
          <img
            src={userImage}
            alt="User"
            className="user-image"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
          <h4 className="username">{getSingedUser?.payload?.name}</h4>
        </div>
      </div>
    </>
  );
}

export default Navbar;
