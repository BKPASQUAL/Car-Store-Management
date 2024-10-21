import React, { useState } from "react";
import { Box, Modal, TextField, Button, CircularProgress } from "@mui/material";
import CameraRetroIcon from "@rsuite/icons/legacy/CameraRetro";
import Swal from "sweetalert2";
import "../../assets/css/AddBrand.css";
import {
  useAddBrandMutation,
  useGetAllBrandsQuery,
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

const AddBrand = ({ open, handleClose }) => {
  const [brandName, setBrandName] = useState("");
  const [brandImage, setBrandImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addBrand] = useAddBrandMutation();
  const { refetch } = useGetAllBrandsQuery();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) setBrandImage(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!brandName || !brandImage) {
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
    formData.append("brandImage", brandImage);

    setLoading(true);
    try {
      const response = await addBrand(formData).unwrap();
      Swal.fire({
        icon: "success",
        title: "Brand Added",
        text: `${response.message || "The brand has been added successfully!"}`,
        showConfirmButton: false,
        timer: 2000,
      });
      refetch();
      setBrandName("");
      setBrandImage(null);
      handleClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        customClass: {
          container: "swal-warning",
        },
        text:
          error.data?.message || "Failed to add the brand. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2 className="addveh-title">Add New Brand</h2>
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
            {brandImage && (
              <div className="logo-preview">
                <img
                  src={URL.createObjectURL(brandImage)}
                  alt="Brand Logo Preview"
                  className="preview-img"
                  style={{ marginTop: "20px" }}
                />
                <span
                  className="material-symbols-outlined"
                  onClick={() => setBrandImage(null)}
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
                setBrandName("");
                setBrandImage(null);
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
