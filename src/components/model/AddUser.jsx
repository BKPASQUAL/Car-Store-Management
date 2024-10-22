import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import CameraRetroIcon from "@rsuite/icons/legacy/CameraRetro";
import Swal from "sweetalert2";
import "../../assets/css/AddVehicle.css";
import {
  useAddUserMutation,
  useGetAllUsersQuery,
  useGetUserByIDQuery,
  useUpdateUserMutation,
} from "../../store/api/userApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 6,
};

const AddUser = ({ open, handleClose, userId }) => {
  const { register, handleSubmit, reset, control, setValue } = useForm();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [addUser] = useAddUserMutation();
  const { refetch: getAllUsersRefetch } = useGetAllUsersQuery();
  const {
    data: getDataById,
    isLoading,
    refetch: userDataByIdRefetch,
  } = useGetUserByIDQuery(userId, {
    skip: !userId,
  });
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (open && userId) {
      userDataByIdRefetch(); // Refetch the data when the modal opens
    }
  }, [open, userId, userDataByIdRefetch]);

  useEffect(() => {
    if (getDataById?.payload && userId && !isLoading) {
      const userData = getDataById.payload;

      // Set form default values
      setValue("name", userData.name);
      setValue("email", userData.email);
      setValue("contactNo", userData.contactNo);
      setValue("address", userData.address);
      setValue("username", userData.username);
      setValue("gender", userData.gender);
      setValue("roleId", userData.roleId);

      // Set the selected files from the image URL for preview
      if (userData.image) {
        setSelectedFiles([{ url: userData.image, isUploaded: true }]);
      }
    } else if (!userId) {
      // Reset form for adding a new user
      reset();
      setSelectedFiles([]);
    }
  }, [getDataById, isLoading, setValue, reset, userId]);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + selectedFiles.length > 1) {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "You can upload only one photo.",
        customClass: {
          container: "swal-warning",
        },
      });
      return;
    }
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const removeImage = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const isUpdateUser = !!userId;
  const isNewUser = !isUpdateUser;

  const onSubmit = async (data) => {
    const formData = new FormData();
  
    // Append only the keys that have a value
    Object.keys(data).forEach((key) => {
      if (key !== "password" || data[key]) {
        formData.append(key, data[key]);
      }
    });
  
    // Handle file uploads
    selectedFiles.forEach((file) => {
      if (file.url) {
        // Ignore already uploaded images
        formData.append("image", file.url);
      } else {
        formData.append("image", file);
      }
    });
  
    try {
      handleClose();
  
      Swal.fire({
        title: userId ? "Updating User..." : "Adding User...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
      let response;
      if (isUpdateUser) {
        // Update user if userId is present
        response = await updateUser({ id: userId, inputData: formData });
      } else {
        // Add new user if no userId
        response = await addUser(formData);
      }
      console.log("Form Data:", data); // This logs the form object

      if (response?.data?.payload && !response?.data?.error) {
        Swal.close();
        reset();
        setSelectedFiles([]);
        getAllUsersRefetch();
        Toast.fire({
          icon: "success",
          title:
            response.payload ||
            `${userId ? "User updated" : "User added"} successfully!`,
        });
      } else {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: userId ? "Failed to Update User" : "Failed to Add User",
          text:
            response?.error?.data?.payload ||
            response?.data?.payload ||
            "Something went wrong. Please try again.",
        });
        reset();
        setSelectedFiles([]);
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error Occurred",
        text: `Unable to ${
          userId ? "update" : "add"
        } user. Please try again later.`,
      });
    }
  };
  
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2 className="addveh-title">
          {userId ? "Edit User" : "Add New User"}
        </h2>
        <hr />
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="image-upload">
              <Button
                variant="outlined"
                component="label"
                startIcon={<CameraRetroIcon />}
              >
                Profile Picture
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />
              </Button>
              <div className="image-previews">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="image-preview">
                    <img
                      src={file.url || URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="preview-img"
                    />
                    <span
                      className="material-symbols-outlined"
                      onClick={() => removeImage(index)}
                    >
                      delete
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="input-fields">
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Name"
                    fullWidth
                    margin="normal"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              <FormControl fullWidth className="addveh-brand">
                <InputLabel>Role</InputLabel>
                <Controller
                  name="roleId"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Role">
                      <MenuItem value={1}>Admin</MenuItem>
                      <MenuItem value={2}>User</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>

              <TextField
                {...register("email")}
                label="Email"
                fullWidth
                margin="normal"
                placeholder="e.g., abc@example.com"
              />

              <TextField
                {...register("contactNo")}
                label="Contact"
                fullWidth
                margin="normal"
                placeholder="e.g., 0771234567"
              />

              <TextField
                {...register("address")}
                label="Address"
                fullWidth
                margin="normal"
                placeholder="e.g., California, USA"
              />

              <FormControl fullWidth className="addveh-brand">
                <InputLabel>Gender</InputLabel>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Gender">
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>

              <TextField
                {...register("username")}
                label="Username"
                fullWidth
                margin="normal"
              />

              <TextField
                {...register("password")}
                label="Password"
                fullWidth
                margin="normal"
                disabled={!!userId}
              />
            </div>

            <div className="form-actions">
              <button
                className="addvehicle-cancel-btn"
                onClick={() => {
                  reset();
                  setSelectedFiles([]);
                  handleClose();
                }}
              >
                Cancel
              </button>
              <button
                className="addvehicle-submit-btn"
                type="submit"
                sx={{ marginRight: 2 }}
              >
                Save
              </button>
            </div>
          </form>
        )}
      </Box>
    </Modal>
  );
};

export default AddUser;
