import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import "../../assets/css/Sidebar.css";
import { useNavigate } from "react-router-dom";
import image from "../../assets/images/logo.webp";
import Swal from "sweetalert2";

function SidebarComp() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("dashboard");

  const navigate = useNavigate();

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    navigate(menuItem);
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    });
    if (result.isConfirmed) {
      localStorage.clear();
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <>
      <Sidebar
        collapsed={collapsed}
        width="200px"
        collapsedWidth="70px"
        transitionDuration={500}
        className="sidebar"
      >
        <Menu>
          <div className="sidebar-logo-con">
            <img src={image} alt="Your Image" className="sidebar-logo" />
          </div>

          {/* Dashboard Menu Item */}
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "dashboard" ? "selected-menu-item" : ""
              }
              icon={
                <span className="material-symbols-outlined sidebar-icon">
                  dashboard
                </span>
              }
              onClick={() => handleMenuItemClick("dashboard")}
            >
              Dashboard
            </MenuItem>
          </div>

          {/* Vehicles Menu Item */}
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "vehical" ? "selected-menu-item" : ""
              }
              icon={
                <span className="material-symbols-outlined sidebar-icon">
                  garage
                </span>
              }
              onClick={() => handleMenuItemClick("vehical")}
            >
              Vehicles
            </MenuItem>
          </div>

          {/* Brands Menu Item */}
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "brands" ? "selected-menu-item" : ""
              }
              icon={
                <span className="material-symbols-outlined sidebar-icon">
                  emoji_transportation
                </span>
              }
              onClick={() => handleMenuItemClick("brands")}
            >
              Brands
            </MenuItem>
          </div>

          {/* Inquiries Menu Item */}
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "inquiries" ? "selected-menu-item" : ""
              }
              icon={
                <span className="material-symbols-outlined sidebar-icon">
                  mail
                </span>
              }
              onClick={() => handleMenuItemClick("inquiries")}
            >
              Inquiries
            </MenuItem>
          </div>

          {/* Users Menu Item */}
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "users" ? "selected-menu-item" : ""
              }
              icon={
                <span className="material-symbols-outlined sidebar-icon">
                  group
                </span>
              }
              onClick={() => handleMenuItemClick("users")}
            >
              Users
            </MenuItem>
          </div>
        </Menu>

        {/* Logout Section */}
        <div className="sidebar-logout" onClick={handleLogout}>
          <span className="material-symbols-outlined sidebar-logout-icon">
            logout
          </span>
          <p>Logout</p>
        </div>
      </Sidebar>

      {/* Logout Modal */}
      {/* <LogoutModal open={logoutModalOpen} handleClose={handleLogoutClose} /> */}
    </>
  );
}

export default SidebarComp;
