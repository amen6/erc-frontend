import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";

function AddNewTask(props) {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState("");
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [Description, setDescription] = useState("");
  const [Guarantor, setGuarantor] = useState("");
  const authHeader = useAuthHeader();

  const cleanState = () => {
    setFirstName("");
    setLastName("");
    setDateOfBirth("");
    setPhone("");
    setAddress("");
    setGuarantor("");
  };

  const handleAdd = () => {
    axios
      .post(
        `${process.env.REACT_APP_URL}patient/`,
        {
          first_name: FirstName,
          last_name: LastName,
          date_of_birth: DateOfBirth,
          phone: Phone,
          address: Address,
          description: Description,
          guarantor: Guarantor,
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
  return (
    <>
      <Dialog open={props.open}>
        <DialogTitle
          sx={{ color: "var(--black)", fontSize: "18px", textAlign: "center" }}
        >
          Add New Team
        </DialogTitle>
        <DialogContent>
          <form style={{ width: "280px" }} onSubmit={handleAdd}>
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
                <h4 style={{ fontWeight: "500", color: "#777" }}>First Name</h4>
              </div>
              <TextField
                type="text"
                id="duration-picker"
                placeholder="First Name"
                required
                sx={{ width: "160px" }}
                value={FirstName}
                variant="outlined"
                onChange={(e) => {
                  setFirstName(e.target.value);
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
                <h4 style={{ fontWeight: "500", color: "#777" }}>Last Name</h4>
              </div>
              <TextField
                type="text"
                id="duration-picker"
                placeholder="LastName"
                required
                sx={{ width: "160px" }}
                value={LastName}
                variant="outlined"
                onChange={(e) => {
                  setLastName(e.target.value);
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
                <h4 style={{ fontWeight: "500", color: "#777" }}>
                  Date Of Birth
                </h4>
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Choose Date"
                  className="mui-datepicker"
                  onChange={(e) => {
                    let time = new Date(e.$d).toISOString();
                    setDateOfBirth(time);
                  }}
                />
              </LocalizationProvider>
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
                <h4 style={{ fontWeight: "500", color: "#777" }}>Phone</h4>
              </div>
              <TextField
                type="text"
                id="duration-picker"
                placeholder="Phone"
                required
                sx={{ width: "160px" }}
                value={Phone}
                variant="outlined"
                onChange={(e) => {
                  setPhone(e.target.value);
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
                <h4 style={{ fontWeight: "500", color: "#777" }}>Address</h4>
              </div>
              <TextField
                type="text"
                id="duration-picker"
                placeholder="Address"
                required
                sx={{ width: "160px" }}
                value={Address}
                variant="outlined"
                onChange={(e) => {
                  setAddress(e.target.value);
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
                <h4 style={{ fontWeight: "500", color: "#777" }}>
                  Description
                </h4>
              </div>
              <TextField
                type="text"
                id="duration-picker"
                placeholder="Description"
                required
                sx={{ width: "160px" }}
                value={Description}
                variant="outlined"
                onChange={(e) => {
                  setDescription(e.target.value);
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
                <h4 style={{ fontWeight: "500", color: "#777" }}>Guarantor</h4>
              </div>
              <TextField
                type="text"
                id="duration-picker"
                placeholder="Guarantor"
                required
                sx={{ width: "160px" }}
                value={Guarantor}
                variant="outlined"
                onChange={(e) => {
                  setGuarantor(e.target.value);
                }}
              />
            </div>
            <DialogActions sx={{ padding: 0, marginTop: "15px" }}>
              <Button variant="outlined" onClick={props.handleClose}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                + Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddNewTask;
