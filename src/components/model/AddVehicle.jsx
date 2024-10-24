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
  useAddCarMutation,
  useGetAllCarsQuery,
  useGetCardataByIdQuery,
  useUpdateCarMutation,
} from "../../store/api/carStore";
import { useGetAllBrandsQuery } from "../../store/api/brands";

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

const AddVehicle = ({ open, handleClose, carId }) => {
  const { register, handleSubmit, reset, control, setValue } = useForm();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [brandId, setBrandId] = useState();
  const [addVehicle] = useAddCarMutation();
  const { refetch: allVehiclesRefetch } = useGetAllCarsQuery();
  const {
    data: getCarDataById,
    isLoading,
    refetch: carDataByIdrefetch,
  } = useGetCardataByIdQuery(carId, {
    skip: !carId,
  });
  const [updateCar] = useUpdateCarMutation();
  const { data: brandData } = useGetAllBrandsQuery();

  useEffect(() => {
    if (open && carId) {
      carDataByIdrefetch(); // Refetch the data when the modal opens
    }
  }, [open, carId, carDataByIdrefetch]);

  useEffect(() => {
    if (getCarDataById?.payload && carId && !isLoading) {
      const carData = getCarDataById.payload;

      setValue("carName", carData.carName);
      setValue("manufacturingYear", carData.manufacturingYear);
      setValue("exteriorColour", carData.exteriorColour);
      setValue("engine", carData.engine);
      setValue("bodyType", carData.bodyType);
      setValue("transmission", carData.transmission);
      setValue("fuelType", carData.fuelType);
      setValue("driverPosition", carData.driverPosition);
      setValue("price", carData.price);
      setBrandId(carData.brandId);

      // Set the selected files from URLs for preview
      setSelectedFiles(
        carData.CarPhotos?.map((url) => ({ url, isUploaded: true })) || []
      );
    } else if (!carId) {
      reset(); // Reset the form for a new vehicle
      setSelectedFiles([]);
      setBrandId("");
    }
  }, [getCarDataById,isLoading, carId, setValue, reset]);

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
      });
      return;
    }
    setSelectedFiles((prevFiles) => [
      ...prevFiles,
      ...files.map((file) => ({ file, isUploaded: false })),
    ]);
  };

  const removeImage = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const isUpdateCar = !!carId;
  const isNewCar = !isUpdateCar;

  const onSubmit = async (data) => {
    try {
      handleClose();

      Swal.fire({
        title: isNewCar ? "Adding Vehicle..." : "Updating Vehicle...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const formData = new FormData();
      formData.append("brandId", brandId);
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value)
      );

      // Include new images that were selected for upload
      selectedFiles.forEach(({ file, url, isUploaded }) => {
        if (!isUploaded && file) {
          formData.append("CarPhotos", file);
        }
      });

      let response;
      if (isNewCar) {
        response = await addVehicle(formData).unwrap();
      } else {
        // For updates, include carId and use the formData with the updateCar mutation
        response = await updateCar({ id: carId, inputData: formData }).unwrap();
      }

      if (response?.payload && !response?.error) {
        allVehiclesRefetch();
        Swal.close();
        reset();
        setSelectedFiles([]);
        setBrandId("");
        Toast.fire({
          icon: "success",
          title: isNewCar
            ? "Vehicle added successfully!"
            : "Vehicle updated successfully!",
        });
      } else {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: isNewCar
            ? "Failed to Add Vehicle"
            : "Failed to Update Vehicle",
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
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error Occurred",
        text: isNewCar
          ? "Unable to add vehicle. Please try again later."
          : "Unable to update vehicle. Please try again later.",
      });
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2 className="addveh-title">
          {isUpdateCar ? "Edit Vehicle" : "Add New Vehicle"}
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
                {selectedFiles.map((fileData, index) => (
                  <div key={index} className="image-preview">
                    <img
                      src={
                        fileData.isUploaded
                          ? fileData.url
                          : URL.createObjectURL(fileData.file)
                      }
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
              <FormControl fullWidth className="addveh-brand">
                <InputLabel>Brand</InputLabel>
                <Select
                  value={brandId || ""}
                  onChange={(e) => setBrandId(e.target.value)}
                >
                  {brandData?.payload?.map((brand) => (
                    <MenuItem key={brand.id} value={brand.id}>
                      {brand.brandName}
                    </MenuItem>
                  ))}
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
                {...register("exteriorColour")}
                label="Colour"
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
                  setBrandId("");
                  setSelectedFiles([]);
                  handleClose();
                }}
              >
                Cancel
              </button>
              <button className="addvehicle-submit-btn" type="submit">
                Save
              </button>
            </div>
          </form>
        )}
      </Box>
    </Modal>
  );
};

export default AddVehicle;
