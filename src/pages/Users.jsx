import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import "../assets/css/CarStore.css";
import { Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import Table from "react-bootstrap/Table";
import "../assets/css/Table.css";
import dummy from "../assets/images/dummy.jpg";
import AddUser from "../components/model/AddUser";
import { useGetAllUsersQuery } from "../store/api/userApi";

function Users() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const { data: userData } = useGetAllUsersQuery();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Filter user data based on search query (firstName or lastName)
  const filteredUsers = userData?.payload?.filter(
    (user) =>
      user?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.lastName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar
        title={"Users"}
        icon={"group"}
        count={userData?.payload ? userData.payload.length : "00"}
      />
      <div className="carStore-main">
        <div className="carStore-top">
          <div className="carStore-left">
            {/* Search Input */}
            <InputGroup inside style={{ width: "500px" }} size="lg">
              <Input
                placeholder="Search By User's Name ..."
                value={searchQuery} // Bind input value to state
                onChange={(value) => setSearchQuery(value)} // Update state on input
              />
              <InputGroup.Button>
                <SearchIcon />
              </InputGroup.Button>
            </InputGroup>
          </div>
          <div className="carStore-right">
            <button className="carStore-add-btn" onClick={handleOpenModal}>
              <span className="material-symbols-outlined addcar-crossicon">
                add
              </span>
              Add User
            </button>
          </div>
        </div>
        <div style={{ maxHeight: "650px", overflowY: "auto", width: "auto" }}>
          <Table striped hover className="product-table text-left table-fixed">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Gender</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user, index) => (
                <tr key={user.id}>
                  <td style={{ width: "5%" }}>
                    <img
                      src={user.image || dummy}
                      alt={`${user.firstName} ${user.lastName}`}
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                  </td>
                  <td style={{ width: "15%" }} className="carStore-table">
                    {user.firstName} {user.lastName}
                  </td>
                  <td style={{ width: "15%" }}>{user.role?.role}</td>
                  <td style={{ width: "15%" }}>{user.email}</td>
                  <td style={{ width: "15%" }}>{user.contactNo}</td>
                  <td style={{ width: "15%" }}>{user.address}</td>
                  <td style={{ width: "15%" }}>{user.gender}</td>
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
      <AddUser open={isModalOpen} handleClose={handleCloseModal} />
    </>
  );
}

export default Users;
