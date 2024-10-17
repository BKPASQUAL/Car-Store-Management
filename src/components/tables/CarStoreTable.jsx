import React from "react";
import Table from "react-bootstrap/Table";
import "../../assets/css/Table.css";
import { useGetAllCarsQuery } from "../../store/api/carStore";
import cardummy from "../../assets/images/cardummy.png";

function CarStoreTable(CategoriesData) {
  const { data: carData } = useGetAllCarsQuery();

  return (
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
          {carData?.payload?.map((car, index) => (
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
              <td style={{ width: "15%" }}>{car.carName}</td>
              <td style={{ width: "15%" }}>{car.carName}</td>
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
  );
}

export default CarStoreTable;
