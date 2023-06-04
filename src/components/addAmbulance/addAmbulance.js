import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Slider,
  Switch,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";

function AddNewTask(props) {
  const [AmbulanceName, setAmbulanceName] = useState("");
  const [FuelAmount, setFuelAmount] = useState(50);
  const [FuelType, setFuelType] = useState("");
  const [Available, setAvailable] = useState(true);
  const [Image, setImage] = useState();
  const authHeader = useAuthHeader();

  const cleanState = () => {
    setAmbulanceName("");
    setFuelAmount(50);
    setFuelType("");
    setAvailable(true);
    setImage();
  };

  const handleAdd = () => {
    const form = new FormData();
    form.append("name", AmbulanceName);
    form.append("image", Image, Image.name);
    form.append("fuel_type", FuelType);
    form.append("fuel_percentage", FuelAmount);
    form.append("out_of_service", Available);
    axios
      .post(
        `${process.env.REACT_APP_URL}ambulance/`,
        {
          form,
        },
        {
          headers: {
            Authorization: authHeader(),
          },
        }
      )
      .then((response) => {
        cleanState();
        props.handleClose();
        props.reFetch();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const StyledSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase": {
      color: "rgb(250, 0, 0)",
      "&:hover": {
        backgroundColor: alpha(
          "rgb(250, 0, 0)",
          theme.palette.action.hoverOpacity
        ),
      },
    },
    "& .MuiSwitch-switchBase + .MuiSwitch-track": {
      backgroundColor: "rgb(250, 0, 0)",
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "rgb(67, 160, 71)",
      "&:hover": {
        backgroundColor: alpha(
          "rgb(67, 160, 71)",
          theme.palette.action.hoverOpacity
        ),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "rgb(67, 160, 71)",
    },
  }));
  return (
    <>
      <Dialog open={props.open}>
        <DialogTitle
          sx={{ color: "var(--black)", fontSize: "18px", textAlign: "center" }}
        >
          Add New Ambulance
        </DialogTitle>
        <DialogContent>
          <form style={{ width: "300px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h4 style={{ fontWeight: "500", color: "#777" }}>Image</h4>
              </div>
              <TextField
                type="file"
                id="duration-picker"
                placeholder=""
                required
                sx={{ width: "160px" }}
                variant="outlined"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h4 style={{ fontWeight: "500", color: "#777" }}>Name</h4>
              </div>
              <TextField
                type="text"
                id="duration-picker"
                placeholder="Ambulance Name"
                required
                sx={{ width: "160px" }}
                value={AmbulanceName}
                variant="outlined"
                onChange={(e) => {
                  setAmbulanceName(e.target.value);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h4 style={{ fontWeight: "500", color: "#777" }}>
                  Fuel Amount
                </h4>
              </div>
              <Slider
                sx={{
                  overflow: "visible",
                  width: "160px",
                }}
                defaultValue={FuelAmount}
                step={10}
                marks
                min={0}
                max={100}
                onChange={(e) => {
                  setFuelAmount(e.target.value);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h4 style={{ fontWeight: "500", color: "#777" }}>Fuel Type</h4>
              </div>
              <TextField
                type="text"
                id="duration-picker"
                placeholder="FuelType"
                required
                sx={{ width: "160px" }}
                value={FuelType}
                variant="outlined"
                onChange={(e) => {
                  setFuelType(e.target.value);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h4 style={{ fontWeight: "500", color: "#777" }}>Available</h4>
              </div>
              <StyledSwitch
                checked={Available}
                onChange={() => {
                  setAvailable(!Available);
                }}
                sx={{ marginRight: "60px" }}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={props.handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAdd}>
            + Add{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddNewTask;
