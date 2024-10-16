import React from "react";
import { useForm } from "react-hook-form";
import { Uploader, Input, Button, Divider } from "rsuite";
import CameraRetroIcon from "@rsuite/icons/legacy/CameraRetro";
import "../../assets/css/AddCar.css";
import { useAddCarMutation } from "../../store/api/carStore";

function AddCar() {
  const [addCar] = useAddCarMutation();
  const { register, handleSubmit, reset } = useForm();
  const [selectedFiles, setSelectedFiles] = React.useState([]);

  const handleImageUpload = (files) => {
    setSelectedFiles(files);
    console.log("Selected Images:", files);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append all form data except images
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    // Append selected files to FormData
    selectedFiles.forEach((file) => {
      formData.append("CarPhotos", file.blobFile); // Use `blobFile` from the Uploader's file object
    });

    try {
      // Send data to the backend using the mutation
      const response = await addCar(formData);
      console.log("Response:", response);
      reset(); // Reset the form after successful submission
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
            <Uploader
              multiple
              listType="picture"
              accept="image/jpeg, image/png, image/gif"
              action="//jsonplaceholder.typicode.com/posts/"
              onChange={handleImageUpload}
            >
              <button type="button">
                <CameraRetroIcon />
              </button>
            </Uploader>
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
            <Button appearance="primary" className="addCar-savebtm" type="submit">
              Save
            </Button>
            <Button
              appearance="primary"
              color="red"
              className="addCar-cancelbtm"
              type="button"
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
