import React from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Divider } from "rsuite";
import CameraRetroIcon from "@rsuite/icons/legacy/CameraRetro";
import "../../assets/css/AddCar.css";
import { useAddCarMutation } from "../../store/api/carStore";

function AddCar() {
  const [addCar] = useAddCarMutation();
  const { register, handleSubmit, reset } = useForm();
  const [selectedFiles, setSelectedFiles] = React.useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    // Only allow a maximum of 5 files
    if (files.length + selectedFiles.length > 5) {
      alert("You can only upload up to 5 photos.");
      return;
    }

    // Update the selected files
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const removeImage = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  
  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    selectedFiles.forEach((file) => {
      formData.append("CarPhotos", file); // Ensure 'CarPhotos' matches the backend field name
    });

    try {
      const response = await addCar(formData);
      console.log("Response:", response);
      reset();
      setSelectedFiles([]);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return (
    <div className="addCar-main">
      <div className="addCar-con">
        <div className="addCar-top">
          <h3>Add New Car</h3>
          <Divider />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="addCar-mid">
            <label htmlFor="carPhotos" className="upload-label">
              <CameraRetroIcon />
              <input
                id="carPhotos"
                type="file"
                multiple
                accept="image/jpeg, image/png, image/gif"
                onChange={handleImageUpload}
                className="custom-file-input"
              />
            </label>
            <div className="image-previews">
              {selectedFiles.map((file, index) => (
                <div key={index} className="image-preview">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="preview-img"
                  />
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeImage(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            {selectedFiles.length >= 5 && (
              <p className="error-text">You can only upload up to 5 photos.</p>
            )}
          </div>
          <div className="addCar-inputFields">
            <div className="addCar-input-left">
              <div>
                <label htmlFor="carName">Car Name</label>
                <Input
                  id="carName"
                  {...register("carName")}
                  placeholder="e.g., Tesla Model S"
                  style={{ width: "380px", marginBottom: "20px" }}
                />
              </div>
              <div>
                <label htmlFor="manufacturingYear">Manufacturing Year</label>
                <Input
                  id="manufacturingYear"
                  {...register("manufacturingYear")}
                  placeholder="e.g., 2023"
                  style={{ width: "380px", marginBottom: "20px" }}
                />
              </div>
              <div>
                <label htmlFor="exteriorColour">Exterior Colour</label>
                <Input
                  id="exteriorColour"
                  {...register("exteriorColour")}
                  placeholder="e.g., Midnight Blue"
                  style={{ width: "380px", marginBottom: "20px" }}
                />
              </div>
              <div>
                <label htmlFor="interiorColour">Interior Colour</label>
                <Input
                  id="interiorColour"
                  {...register("interiorColour")}
                  placeholder="e.g., Black"
                  style={{ width: "380px", marginBottom: "20px" }}
                />
              </div>
              <div>
                <label htmlFor="driverPosition">Driver Position</label>
                <Input
                  id="driverPosition"
                  {...register("driverPosition")}
                  placeholder="e.g., Left-Hand Drive"
                  style={{ width: "380px", marginBottom: "20px" }}
                />
              </div>
            </div>
            <div className="addCar-input-right">
              <div>
                <label htmlFor="engineType">Engine Type</label>
                <Input
                  id="engineType"
                  {...register("engineType")}
                  placeholder="e.g., V8"
                  style={{ width: "380px", marginBottom: "20px" }}
                />
              </div>
              <div>
                <label htmlFor="bodyType">Body Type</label>
                <Input
                  id="bodyType"
                  {...register("bodyType")}
                  placeholder="e.g., Sedan, SUV"
                  style={{ width: "380px", marginBottom: "20px" }}
                />
              </div>
              <div>
                <label htmlFor="transmission">Transmission</label>
                <Input
                  id="transmission"
                  {...register("transmission")}
                  placeholder="e.g., Automatic"
                  style={{ width: "380px", marginBottom: "20px" }}
                />
              </div>
              <div>
                <label htmlFor="fuelType">Fuel Type</label>
                <Input
                  id="fuelType"
                  {...register("fuelType")}
                  placeholder="e.g., Electric, Diesel"
                  style={{ width: "380px", marginBottom: "20px" }}
                />
              </div>
              <div>
                <label htmlFor="price">Price</label>
                <Input
                  id="price"
                  {...register("price")}
                  placeholder="e.g., 50000"
                  style={{ width: "380px", marginBottom: "20px" }}
                />
              </div>
            </div>
          </div>
          <div className="addCar-btm">
            <Button
              appearance="primary"
              className="addCar-savebtm"
              type="submit"
              disabled={selectedFiles.length === 0}
            >
              Save
            </Button>
            <Button
              appearance="primary"
              color="red"
              className="addCar-cancelbtm"
              type="button"
              onClick={() => {
                reset();
                setSelectedFiles([]);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCar;
