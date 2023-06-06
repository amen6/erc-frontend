import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Switch,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";

function AddNewTask(props) {
  const [Image, setImage] = useState("");
  const [HospitalName, setHospitalName] = useState("");
  const [HospitalCode, setHospitalCode] = useState("");
  const [Available, setAvailable] = useState(true);
  const authHeader = useAuthHeader();

  const cleanState = () => {
    setHospitalName("");
    setHospitalCode("");
    setAvailable(true);
    setImage("");
  };

  const handleAdd = () => {
    const form = new FormData();
    form.append("name", HospitalName);
    form.append("image", Image);
    form.append("available", Available);
    form.append("hospital_code", HospitalCode);
    axios
      .post(`${process.env.REACT_APP_URL}hospital/`, form, {
        headers: {
          Authorization: authHeader(),
        },
      })
      .then((response) => {
        cleanState();
        props.handleClose();
        props.getData();
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

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
      <Dialog open={props.open}>
        <DialogTitle
          sx={{ color: "var(--black)", fontSize: "18px", textAlign: "center" }}
        >
          Add New Hospital
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
              <input
                className="css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input"
                type="file"
                id="duration-picker"
                placeholder=""
                required
                style={{ width: "160px" }}
                onChange={(e) => {
                  handleChangeImage(e);
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
                placeholder="Hospital Name"
                required
                sx={{ width: "160px" }}
                value={HospitalName}
                variant="outlined"
                onChange={(e) => {
                  setHospitalName(e.target.value);
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
                <h4 style={{ fontWeight: "500", color: "#777" }}>Code</h4>
              </div>
              <TextField
                type="text"
                id="duration-picker"
                placeholder="Hospital Code"
                required
                sx={{ width: "160px" }}
                value={HospitalCode}
                variant="outlined"
                onChange={(e) => {
                  setHospitalCode(e.target.value);
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
