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

const AddVehicle = ({ open, handleClose }) => {
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
    if (files.length + selectedFiles.length > 5) {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "You can upload a maximum of 5 photos.",
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
      const response = await addVehicle(formData).unwrap();
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
        <h2 className="addveh-title">Add New Vehicle</h2>
        <hr />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="image-upload">
            <Button
              variant="outlined"
              component="label"
              startIcon={<CameraRetroIcon />}
            >
              Upload Photos
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
            <FormControl
              fullWidth
              className="addveh-brand"
              rules={{ required: "Vehicle name is required" }}
            >
              <InputLabel>Brand</InputLabel>
              <Select
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
              >
                <MenuItem value={1}>Toyota</MenuItem>
                <MenuItem value={2}>Honda</MenuItem>
                <MenuItem value={3}>Ford</MenuItem>
              </Select>
            </FormControl>

            <Controller
              name="carName"
              control={control}
              rules={{ required: "Vehicle name is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Vehicle Name"
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <TextField
              {...register("manufacturingYear")}
              label="Manufacturing Year"
              fullWidth
              margin="normal"
              placeholder="e.g., 2023"
            />

            <TextField
              {...register("interiorColour")}
              label="Interior Colour"
              fullWidth
              margin="normal"
              placeholder="e.g., Black"
            />

            <TextField
              {...register("engine")}
              label="Engine Type"
              fullWidth
              margin="normal"
              placeholder="e.g., V8"
            />

            <TextField
              {...register("bodyType")}
              label="Body Type"
              fullWidth
              margin="normal"
              placeholder="e.g., Sedan, SUV"
            />

            <TextField
              {...register("transmission")}
              label="Transmission"
              fullWidth
              margin="normal"
              placeholder="e.g., Automatic"
            />

            <TextField
              {...register("fuelType")}
              label="Fuel Type"
              fullWidth
              margin="normal"
              placeholder="e.g., Diesel"
            />

            <TextField
              {...register("driverPosition")}
              label="Driver Position"
              fullWidth
              margin="normal"
              placeholder="e.g., Left-Hand Drive"
            />

            <TextField
              {...register("price")}
              label="Price"
              type="number"
              fullWidth
              margin="normal"
              placeholder="e.g., 50000"
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

export default AddVehicle;
