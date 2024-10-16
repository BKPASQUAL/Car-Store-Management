import React from "react";
import Navbar from "../components/common/Navbar";
import "../assets/css/CarStore.css";
import { Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import { Button } from "rsuite";
import { InputPicker } from "rsuite";
import CarStoreTable from "../components/tables/CarStoreTable";

function CarStore() {
  const data = [
    "Eugenia",
    "Bryan",
    "Linda",
    "Nancy",
    "Lloyd",
    "Alice",
    "Julia",
    "Albert",
    "Louisa",
    "Lester",
    "Lola",
    "Lydia",
    "Hal",
    "Hannah",
    "Harriet",
    "Hattie",
    "Hazel",
    "Hilda",
  ].map((item) => ({ label: item, value: item }));

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
            <InputPicker data={data} style={{ width: 250  , marginRight:"60px"}} size="md"/>
            <Button appearance="primary" style={{ width: "150px" }} size="md">
              <span class="material-symbols-outlined addcar-crossicon">
                add
              </span>
              Add Car
            </Button>
          </div>
        </div>
        <div className="carStore-btm">
            <CarStoreTable/>
        </div>
      </div>
    </>
  );
}

export default CarStore;
