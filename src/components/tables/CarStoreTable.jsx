import React from "react";
import Table from "react-bootstrap/Table";
import "../../assets/css/Table.css";
import { useGetAllCarsQuery } from "../../store/api/carStore";
import dummyImg from "../../assets/images/dummy.jpg";

function CarStoreTable(CategoriesData) {
  const { data: carData } = useGetAllCarsQuery();
  console.log("carData", carData);

  return (
    <div>
      <div style={{ maxHeight: "650px", overflowY: "auto", width: "auto" }}>
        <Table striped hover className="product-table text-left table-fixed">
          <thead>
            <tr>
              <th></th>
              <th>Car Name</th>
              <th>Brand</th>
              <th>Year</th>
              <th>Fuel Type</th>
              <th>Price</th>
              <th>....</th>
              <th>....</th>
            </tr>
          </thead>
          <tbody>
            {carData?.payload?.map((car, index) => (
              <tr key={car.id}>
                <td style={{ width: "3%" }}>
                  <img
                    src={car.CarPhotos?.[0] || dummyImg}
                    alt={car.carName}
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                </td>
                <td style={{ width: "20%" }} className="carStore-table">
                  {car.carName}
                </td>
                <td style={{ width: "15%" }}>{car.brandName}</td>
                <td style={{ width: "15%" }}>{car.manufacturingYear}</td>
                <td style={{ width: "15%" }}>{car.fuelType}</td>
                <td style={{ width: "15%" }}>{car.price}</td>
                <td style={{ width: "4%" }} className="table-icon">
                  <span className="material-symbols-outlined">edit</span>
                </td>
                <td
                  style={{ width: "5%", marginRight: "20px" }}
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
  );
}

export default CarStoreTable;
