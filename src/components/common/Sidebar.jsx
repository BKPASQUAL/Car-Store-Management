import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import "../../assets/css/Sidebar.css";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../model/LogoutModal";
import image from "../../assets/images/logo.webp";

function SidebarComp() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("dashbourd");
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogoutOpen = () => {
    setLogoutModalOpen(true);
  };

  const handleLogoutClose = () => {
    setLogoutModalOpen(false);
  };

  const navigate = useNavigate();

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    navigate(menuItem);
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
                selectedMenuItem === "dashbourd" ? "selected-menu-item" : ""
              }
              icon={
                <span className="material-symbols-outlined sidebar-icon">
                  dashboard
                </span>
              }
              onClick={() => handleMenuItemClick("dashbourd")}
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
        <div className="sidebar-logout" onClick={handleLogoutOpen}>
          <span className="material-symbols-outlined sidebar-logout-icon">
            logout
          </span>
          <p>Logout</p>
        </div>
      </Sidebar>

      {/* Logout Modal */}
      <LogoutModal open={logoutModalOpen} handleClose={handleLogoutClose} />
    </>
  );
}

export default SidebarComp;
