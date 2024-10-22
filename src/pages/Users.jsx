import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import "../assets/css/CarStore.css";
import { Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import Table from "react-bootstrap/Table";
import "../assets/css/Table.css";
import dummy from "../assets/images/dummy.jpg";
import AddUser from "../components/model/AddUser";
import { useDeleteUserMutation, useGetAllUsersQuery } from "../store/api/userApi";
import Swal from "sweetalert2";
import nodataImg from "../assets/images/nodata.svg";

function Users() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: userData , refetch:allUsersRefetch} = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const handleOpenModal = () => {
    setSelectedUserId(null); // Reset user ID when adding a new user
    setModalOpen(true);
  };

  const handleUpdate = (userId) => {
    setSelectedUserId(userId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUserId(null);
  };

  // Filter user data based on search query (name or lastName)
  const filteredUsers = userData?.payload?.filter(
    (user) =>
      user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.lastName?.toLowerCase().includes(searchQuery.toLowerCase())
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
        const response = await deleteUser(id);
        console.log(response);
        if (response?.data?.payload && !response?.data?.error) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: response.payload,
            showConfirmButton: false,
            timer: 1000,
          });
          allUsersRefetch();
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
        title={"Users"}
        icon={"group"}
        count={userData?.payload ? userData.payload.length : "00"}
      />
      <div className="carStore-main">
        <div className="carStore-top">
          <div className="carStore-left">
            <InputGroup inside style={{ width: "500px" }} size="lg">
              <Input
                placeholder="Search By User's Name ..."
                value={searchQuery}
                onChange={(value) => setSearchQuery(value)}
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
        <div style={{ maxHeight: "640px", overflowY: "auto", width: "auto" }}>
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
                  <td style={{ width: "10%" }} className="img-col">
                    <img
                      src={user.image || dummy}
                      alt={`${user.name}`}
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                  </td>
                  <td style={{ width: "15%" }} className="carStore-table">
                    {user.name}
                  </td>
                  <td style={{ width: "10%" }}>{user.role?.role}</td>
                  <td style={{ width: "15%" }}>{user.email}</td>
                  <td style={{ width: "15%" }}>{user.contactNo}</td>
                  <td style={{ width: "20%" }}>{user.address}</td>
                  <td style={{ width: "10%" }}>{user.gender}</td>
                  <td style={{ width: "10%" }} className="table-icon">
                    <span
                      className="material-symbols-outlined"
                      onClick={() => handleUpdate(user.id)}
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
                      onClick={() => handleDelete(user.id)}
                    >
                      delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {filteredUsers?.length == 0 && (
            <div className="error-message">
              <img src={nodataImg} />
              <p>No Data Available!</p>
            </div>
          )}
        </div>
      </div>
      <AddUser
        open={isModalOpen}
        handleClose={handleCloseModal}
        userId={selectedUserId}
      />
    </>
  );
}

export default Users;
