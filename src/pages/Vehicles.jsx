import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import "../assets/css/CarStore.css";
import { Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import { InputPicker } from "rsuite";
import AddVehicle from "../components/model/AddVehicle";
import Table from "react-bootstrap/Table";
import "../assets/css/Table.css";
import nodataImg from "../assets/images/nodata.svg";
import {
  useDeleteCarMutation,
  useGetAllCarsQuery,
} from "../store/api/carStore";
import cardummy from "../assets/images/cardummy.png";
import Swal from "sweetalert2";
import { useGetAllBrandsQuery } from "../store/api/brands";

function Vehicles() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const { data: carData, refetch: allVehiclesRefetch } = useGetAllCarsQuery();
  const [deleteVehicle] = useDeleteCarMutation();
  const { data: getAllBrands } = useGetAllBrandsQuery();

  console.log(getAllBrands);
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleUpdate = (carId) => {
    setSelectedCarId(carId);
    setModalOpen(true);
    console.log(carId);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCarId(null);
  };

  const filteredCars = carData?.payload?.filter(
    (car) =>
      (car?.carName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car?.brandName?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedBrand ? car.brandId === selectedBrand : true)
  );

  const brandOptions =
    getAllBrands?.payload?.map((brand) => ({
      label: brand.brandName,
      value: brand.id,
    })) || [];

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteVehicle(id);
        console.log(response);
        if (response?.data?.payload && !response?.data?.error) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: response.payload,
            showConfirmButton: false,
            timer: 1000,
          });
          allVehiclesRefetch();
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text:
              response?.error?.data?.payload ||
              response?.data?.payload ||
              "Something went wrong. Please try again.",
          });
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error Occurred",
          text:
            error.message ||
            "Unable to delete vehicle. Please try again later.",
        });
      }
    }
  };

  return (
    <>
      <Navbar
        title={"Vehicles"}
        icon={"garage"}
        count={carData?.payload ? carData.payload.length : "00"}
      />
      <div className="carStore-main">
        <div className="carStore-top">
          <div className="carStore-left">
            {/* Search Input */}
            <InputGroup inside style={{ width: "500px" }} size="lg">
              <Input
                placeholder="Search Vehicles By Name or Brand ..."
                value={searchQuery}
                onChange={(value) => setSearchQuery(value)}
              />
              <InputGroup.Button>
                <SearchIcon />
              </InputGroup.Button>
            </InputGroup>
          </div>
          <div className="carStore-right">
            <InputPicker
              data={brandOptions}
              style={{ width: 250, marginRight: "60px" }}
              size="lg"
              placeholder="Select Brand"
              onChange={(value) => setSelectedBrand(value)}
              value={selectedBrand}
            />
            <button className="carStore-add-btn" onClick={handleOpenModal}>
              <span className="material-symbols-outlined addcar-crossicon">
                add
              </span>
              Add Vehicle
            </button>
          </div>
        </div>
        <div style={{ maxHeight: "640px", overflowY: "auto", width: "auto" }}>
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
                      src={car.brandImage || cardummy}
                      alt={car.carName}
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                  </td>
                  <td style={{ width: "10%" }} className="carStore-table">
                    {car.brandName}
                  </td>
                  <td style={{ width: "16%" }}>{car.carName}</td>
                  <td style={{ width: "16%" }}>{car.manufacturingYear}</td>
                  <td style={{ width: "16%" }}>{car.exteriorColour}</td>
                  <td style={{ width: "16%" }}>{car.engine}</td>
                  <td style={{ width: "16%" }}>{car.price}</td>
                  <td style={{ width: "12%" }} className="table-icon">
                    <span
                      className="material-symbols-outlined"
                      onClick={() => handleUpdate(car.id)}
                    >
                      edit
                    </span>
                  </td>
                  <td
                    style={{ width: "10%", marginRight: "10px" }}
                    className="table-icon-pen"
                  >
                    <span
                      className="material-symbols-outlined"
                      onClick={() => handleDelete(car.id)}
                    >
                      delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {filteredCars?.length == 0 && (
            <div className="error-message">
              <img src={nodataImg} />
              <p>No Data Available!</p>
            </div>
          )}
        </div>
      </div>
      <AddVehicle
        open={isModalOpen}
        handleClose={handleCloseModal}
        carId={selectedCarId}
      />
    </>
  );
}

export default Vehicles;
