import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import "../assets/css/Brands.css";
import {
  useDeleteBrandMutation,
  useGetAllBrandsQuery,
} from "../store/api/brands";
import { Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import AddBrand from "../components/model/AddBrand";
import Swal from "sweetalert2";
import nodataImg from "../assets/images/nodata.svg";

export default function Brands() {
  const { data: brandData , refetch : brandDataRefetch } = useGetAllBrandsQuery();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [deleteBrand] = useDeleteBrandMutation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenModal = () => {
    setModalOpen(true);
    setSelectedBrandId(null);
  };

  const handleUpdate = (brandId) => {
    setSelectedBrandId(brandId);
    setModalOpen(true);
    console.log(brandId);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBrandId(null);
  };

  const filteredBrands = brandData?.payload.filter((brand) =>
    brand.brandName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        const response = await deleteBrand(id);
        console.log(response);
        if (response?.data?.payload && !response?.data?.error) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: response.payload,
            showConfirmButton: false,
            timer: 1000,
          });
          brandDataRefetch();
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
        title={"Brands"}
        icon={"emoji_transportation"}
        count={brandData?.payload?.length}
      />

      <div className="brands-con">
        <div className="brands-top">
          <div className="brands-left">
            <InputGroup inside style={{ width: "500px" }} size="lg">
              <Input
                placeholder="Search Brands ..."
                value={searchQuery}
                onChange={(value) => setSearchQuery(value)}
              />
              <InputGroup.Button>
                <SearchIcon />
              </InputGroup.Button>
            </InputGroup>
          </div>
          <div className="brands-right">
            <button className="carStore-add-btn" onClick={handleOpenModal}>
              <span className="material-symbols-outlined addcar-crossicon">
                add
              </span>
              Add Brand
            </button>
          </div>
        </div>

        <div className="brand-card-con">
          {filteredBrands?.map((brand) => (
            <div key={brand.id} className="brand-card">
              <img
                className="brand-card-img"
                src={brand.brandImage}
                alt={brand.brandName}
              />
              <p>{brand.brandName}</p>
              <div className="card-actions">
                <span
                  className="material-symbols-outlined edit-icon"
                  onClick={() => handleUpdate(brand.id)}
                >
                  edit
                </span>
                <span
                  className="material-symbols-outlined delete-icon"
                  onClick={() => handleDelete(brand.id)}
                >
                  delete
                </span>
              </div>
            </div>
          ))}
          {filteredBrands?.length === 0 && (
            <div className="error-message">
              <img src={nodataImg} alt="No data" />
              <p>No Data Available!</p>
            </div>
          )}
        </div>
      </div>

      {/* AddBrand modal invocation with props */}
      <AddBrand
        open={isModalOpen}
        handleClose={handleCloseModal}
        brandId={selectedBrandId}
      />
    </>
  );
}
