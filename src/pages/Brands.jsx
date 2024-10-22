import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import "../assets/css/Brands.css";
import { useGetAllBrandsQuery } from "../store/api/brands";
import { Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import AddBrand from "../components/model/AddBrand"; 
import nodataImg from "../assets/images/nodata.svg";

export default function Brands() {
  const { data: brandData } = useGetAllBrandsQuery();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState(null); 
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
                <span className="material-symbols-outlined delete-icon">
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
      <AddBrand open={isModalOpen} handleClose={handleCloseModal} brandId={selectedBrandId} />
    </>
  );
}
