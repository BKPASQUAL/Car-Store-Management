import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import "../assets/css/Brands.css";
import { useGetAllBrandsQuery } from "../store/api/brands";
import { Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";

export default function Brands() {
  const { data: brandData } = useGetAllBrandsQuery();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Navbar title={"Brands"} icon={"emoji_transportation"} count={"00"} />

      <div className="brands-con">
        <div className="brands-top">
          <div className="brands-left">
            <InputGroup inside style={{ width: "500px" }} size="lg">
              <Input
                placeholder="Search Brands ..."
                // value={searchQuery}
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
          {brandData?.payload.map((brand) => (
            <div key={brand.id} className="brand-card">
              <img
                className="brand-card-img"
                src={brand.brandImage}
                alt={brand.brandName}
              />
              <p>{brand.brandName}</p>
              <div className="card-actions">
                <span className="material-symbols-outlined edit-icon">
                  edit
                </span>
                <span className="material-symbols-outlined delete-icon">
                  delete
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
