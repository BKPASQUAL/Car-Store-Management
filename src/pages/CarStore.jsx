import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import "../assets/css/CarStore.css";
import { Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import { Button } from "rsuite";
import { InputPicker } from "rsuite";
import CarStoreTable from "../components/tables/CarStoreTable";
import { Outlet } from "react-router-dom";
import AddCar from "../components/model/AddCar";

function CarStore() {
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);

  const data = [
    "Eugenia", "Bryan", "Linda", "Nancy", "Lloyd", "Alice", "Julia",
    "Albert", "Louisa", "Lester", "Lola", "Lydia", "Hal", "Hannah",
    "Harriet", "Hattie", "Hazel", "Hilda"
  ].map((item) => ({ label: item, value: item }));

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
            <InputGroup inside style={{ width: "500px" }} size="md">
              <Input placeholder="Search By Car Name ..." />
              <InputGroup.Button>
                <SearchIcon />
              </InputGroup.Button>
            </InputGroup>
          </div>
          <div className="carStore-right">
            <InputPicker
              data={data}
              style={{ width: 250, marginRight: "60px" }}
              size="md"
            />
            <Button
              appearance="primary"
              style={{ width: "150px" }}
              size="md"
              onClick={handleAddCar}
            >
              <span className="material-symbols-outlined addcar-crossicon">
                add
              </span>
              Add Car
            </Button>
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
    </>
  );
}

export default CarStore;
