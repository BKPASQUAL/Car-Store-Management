import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import "../assets/css/CarStore.css";
import { Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import { InputPicker } from "rsuite";
import AddVehicle from "../components/model/AddVehicle";
import Table from "react-bootstrap/Table";
import "../assets/css/Table.css";
import { useGetAllCarsQuery } from "../store/api/carStore";
import cardummy from "../assets/images/cardummy.png";

function Vehicles() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const { data: carData } = useGetAllCarsQuery();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Filtered car data based on search query (carName or brandName)
  const filteredCars = carData?.payload?.filter((car) =>
    car?.carName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car?.brandName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const data = ["Eugenia", "Bryan"].map((item) => ({
    label: item,
    value: item,
  }));

  return (
    <>
      <Navbar title="Store Management" />
      <div className="carStore-main">
        <div className="carStore-top">
          <div className="carStore-left">
            {/* Search Input */}
            <InputGroup inside style={{ width: "500px" }} size="lg">
              <Input
                placeholder="Search Vehicles By Name or Brand ..."
                value={searchQuery} // Bind input value to state
                onChange={(value) => setSearchQuery(value)} // Update state on input
              />
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
            <button className="carStore-add-btn" onClick={handleOpenModal}>
              <span className="material-symbols-outlined addcar-crossicon">
                add
              </span>
              Add Vehicle
            </button>
          </div>
        </div>
        <div style={{ maxHeight: "650px", overflowY: "auto", width: "auto" }}>
          <Table striped hover className="product-table text-left table-fixed">
            <thead>
              <tr>
                <th></th>
                <th>Brand</th>
                <th>Name</th>
                <th>Year</th>
                <th>Color</th>
                <th>Engine</th>
                <th>Price</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredCars?.map((car, index) => (
                <tr key={car.id}>
                  <td style={{ width: "5%" }}>
                    <img
                      src={car.CarPhotos?.[0] || cardummy}
                      alt={car.carName}
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                  </td>
                  <td style={{ width: "15%" }} className="carStore-table">
                    {car.brandName}
                  </td>
                  <td style={{ width: "15%" }}>{car.carName}</td>
                  <td style={{ width: "15%" }}>{car.manufacturingYear}</td>
                  <td style={{ width: "15%" }}>{car.exteriorColor}</td>
                  <td style={{ width: "15%" }}>{car.engineType}</td>
                  <td style={{ width: "15%" }}>{car.price}</td>
                  <td style={{ width: "10%" }} className="table-icon">
                    <span className="material-symbols-outlined">edit</span>
                  </td>
                  <td
                    style={{ width: "10%", marginRight: "10px" }}
                    className="table-icon-pen"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <AddVehicle open={isModalOpen} handleClose={handleCloseModal} />
    </>
  );
}

export default Vehicles;
