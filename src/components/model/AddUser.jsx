import React, { useState } from "react";
import {
  Box,
  Modal,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import CameraRetroIcon from "@rsuite/icons/legacy/CameraRetro";
import Swal from "sweetalert2";
import "../../assets/css/AddVehicle.css";
import { useAddCarMutation } from "../../store/api/carStore";

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

const AddUser = ({ open, handleClose }) => {
  const { register, handleSubmit, reset, control } = useForm();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [brandId, setBrandId] = useState();
  const [addVehicle] = useAddCarMutation();

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
          container: 'swal-warning'
        }
      });
      return;
    }
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const removeImage = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    console.log("data:", data);
    const formData = new FormData();
    formData.append("brandId", brandId);
    // Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    selectedFiles.forEach((file) => formData.append("CarPhotos", file));

    try {
      handleClose();
      console.log("formData:", formData);

      // Show loading indicator while making the API call
      Swal.fire({
        title: "Adding Vehicle...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Make API call to add vehicle
      const response = await addVehicle(formData);
      console.log("API Response:", response);

      if (response?.payload && !response?.error) {
        // Show success message and reset the form if no error
        Swal.close();
        reset();
        setSelectedFiles([]);
        setBrandId("");
        Toast.fire({ icon: "success", title: response.payload });
      } else {
        // Show error message from API response
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Failed to Add Vehicle",
          text:
            response?.error?.data?.payload ||
            response?.data?.payload ||
            "Something went wrong. Please try again.",
        });
        reset();
        setSelectedFiles([]);
        setBrandId("");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.close();
      // Show error message for unexpected errors
      Swal.fire({
        icon: "error",
        title: "Error Occurred",
        text: "Unable to add vehicle. Please try again later.",
      });
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2 className="addveh-title">Add New User</h2>
        <hr />

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
                multiple
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
            </Button>
            <div className="image-previews">
              {selectedFiles.map((file, index) => (
                <div key={index} className="image-preview">
                  <img
                    src={URL.createObjectURL(file)}
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

            <FormControl
              fullWidth
              className="addveh-brand"
            >
              <InputLabel>Role</InputLabel>
              <Select
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
              >
                <MenuItem value={1}>Admin</MenuItem>
                <MenuItem value={2}>User</MenuItem>
              </Select>
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

            <FormControl
              fullWidth
              className="addveh-brand"
            >
              <InputLabel>Gender</InputLabel>
              <Select
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
              >
                <MenuItem value={1}>Male</MenuItem>
                <MenuItem value={2}>Female</MenuItem>
              </Select>
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
            />
          </div>

          <div className="form-actions">
            <button
              className="addvehicle-cancel-btn"
              onClick={() => {
                reset();
                setBrandId();
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
              //   disabled={selectedFiles.length === 0}
            >
              Save
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default AddUser;
