import React, { useState, useEffect } from "react";
import { Box, Modal, TextField, Button, CircularProgress } from "@mui/material";
import CameraRetroIcon from "@rsuite/icons/legacy/CameraRetro";
import Swal from "sweetalert2";
import "../../assets/css/AddBrand.css";
import {
  useAddBrandMutation,
  useUpdatebrandMutation,  // For updating brand
  useGetAllBrandsQuery,
  useGetBrandByIdQuery,
} from "../../store/api/brands";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const AddBrand = ({ open, handleClose, brandId }) => {
  const [brandName, setBrandName] = useState("");
  const [brandImage, setBrandImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null); 
  const [loading, setLoading] = useState(false);
  
  const [addBrand] = useAddBrandMutation();
  const [updateBrand] = useUpdatebrandMutation();  
  const { refetch } = useGetAllBrandsQuery();
  const { data: getBrandById, isLoading , refetch: getBrandByIdRefetch} = useGetBrandByIdQuery(brandId, {
    skip: !brandId,
  });

  useEffect(() => {
    if (open && brandId) {
      getBrandByIdRefetch(); 
    }
  }, [open, brandId, getBrandByIdRefetch]);

  useEffect(() => {
    if (getBrandById?.payload && brandId && !isLoading) {
      const brandData = getBrandById.payload;
      setBrandName(brandData.brandName);  
      setExistingImage(brandData.brandImage);  
    } else if (!brandId) {
      resetForm(); 
    }
  }, [getBrandById, isLoading, brandId]);

  const resetForm = () => {
    setBrandName("");
    setBrandImage(null);
    setExistingImage(null);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) setBrandImage(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!brandName || (!brandImage && !existingImage)) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please provide both a brand name and logo.",
        customClass: {
          container: "swal-warning",
        },
      });
      return;
    }

    const formData = new FormData();
    formData.append("brandName", brandName);
    if (brandImage) formData.append("brandImage", brandImage); 
    
    // Log data to the console
    console.log("Form Data Submitted:", {
      brandName,
      brandImage: brandImage ? brandImage.name : "Using existing image",
    });

    setLoading(true);
    try {
      let response;
      if (brandId) {
        // Update brand if editing
        response = await updateBrand({ id: brandId, inputData: formData }).unwrap();
      } else {
        // Add new brand if no brandId
        response = await addBrand(formData).unwrap();
      }
      
      Swal.fire({
        icon: "success",
        title: brandId ? "Brand Updated" : "Brand Added",
        text: `${response.message || "The brand has been saved successfully!"}`,
        showConfirmButton: false,
        timer: 2000,
      });
      
      refetch();
      resetForm();
      handleClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        customClass: {
          container: "swal-warning",
        },
        text:
          error.data?.message || "Failed to save the brand. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2 className="addveh-title">{brandId ? "Edit Brand" : "Add New Brand"}</h2>
        <hr />
        <form onSubmit={handleFormSubmit}>
          <div className="image-upload">
            <Button
              variant="outlined"
              component="label"
              startIcon={<CameraRetroIcon />}
            >
              Upload Logo
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
            </Button>
            {(brandImage || existingImage) && (
              <div className="logo-preview">
                <img
                  src={brandImage ? URL.createObjectURL(brandImage) : existingImage} // Show new image or existing image
                  alt="Brand Logo Preview"
                  className="preview-img"
                  style={{ marginTop: "20px" }}
                />
                <span
                  className="material-symbols-outlined"
                  onClick={() => {
                    setBrandImage(null);
                    setExistingImage(null); // Clear both images
                  }}
                >
                  delete
                </span>
              </div>
            )}
          </div>

          <TextField
            label="Brand Name"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            fullWidth
            margin="normal"
          />

          <div className="form-actions">
            <button
              className="addvehicle-cancel-btn"
              onClick={() => {
                resetForm();
                handleClose();
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="addvehicle-submit-btn"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Save"}
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default AddBrand;
