import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import "../assets/css/CarStore.css";
import { Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import { InputPicker } from "rsuite";
import CarStoreTable from "../components/tables/CarStoreTable";
import { Outlet } from "react-router-dom";
import AddCar from "../components/model/AddCar";
import AddVehicle from "../components/model/AddVehicle";

function CarStore() {
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const data = ["Eugenia", "Bryan"].map((item) => ({
    label: item,
    value: item,
  }));

  const handleAddCar = () => {
    setIsAddCarModalOpen(true);
  };

  const handleClose = () => {
    setIsAddCarModalOpen(false);
  };

  return (
    <>
      <Navbar title="Store Management" />
      <div className="carStore-main">
        <div className="carStore-top">
          <div className="carStore-left">
            <InputGroup inside style={{ width: "500px" }} size="lg">
              <Input placeholder="Search Vehicles ..." />
              <InputGroup.Button>
                <SearchIcon />
              </InputGroup.Button>
            </InputGroup>
          </div>
          <div className="carStore-right">
            <InputPicker
              data={data}
              style={{ width: 250, marginRight: "60px" }}
              size="lg"
              placeholder="Select Brand"
            />
            <button className="carStore-add-btn" onClick={handleAddCar}>
              <span className="material-symbols-outlined addcar-crossicon">
                add
              </span>
              Add Car
            </button>
            <button className="carStore-add-btn" onClick={handleOpenModal}>
              <span className="material-symbols-outlined addcar-crossicon">
                add
              </span>
              Add Vehicle
            </button>
          </div>
        </div>
        <div className="carStore-btm">
          <CarStoreTable />
        </div>
      </div>
      <Outlet />

      {/* Bootstrap Add Car Modal with Custom Backdrop */}
      {isAddCarModalOpen && (
        <>
          <div
            className={`modal-backdrop show custom-backdrop`}
            onClick={handleClose}
          ></div>
          <div
            className={`modal fade show d-block`}
            tabIndex="-1"
            role="dialog"
            style={{ display: isAddCarModalOpen ? "block" : "none" }}
          >
            <div
              className="modal-dialog"
              role="document"
              style={{
                maxWidth: "55vw",
                height: "auto",
                margin: "auto",
                top: "60px",
              }}
            >
              <div className="modal-content" style={{ height: "100%" }}>
                <div className="modal-body" style={{ padding: 0 }}>
                  <AddCar />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <AddVehicle open={isModalOpen} handleClose={handleCloseModal} />
    </>
  );
}

export default CarStore;
