import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";

function AddNewTask(props) {
  const [TeamName, setTeamName] = useState("");
  const [Leader, setLeader] = useState("");
  const [Driver, setDriver] = useState("");
  const [FirstParamedic, setFirstParamedic] = useState("");
  const [SecondParamedic, setSecondParamedic] = useState("");
  const [Ambulance, setAmbulance] = useState("");
  const authHeader = useAuthHeader();

  const cleanState = () => {
    setTeamName("");
    setLeader("");
    setDriver("");
    setFirstParamedic("");
    setSecondParamedic("");
    setAmbulance("");
  };

  const handleAdd = () => {
    axios
      .post(
        `${process.env.REACT_APP_URL}team/`,
        {
          team_name: TeamName,
          mission_leader: Leader,
          driver: Driver,
          first_paramedic: FirstParamedic,
          second_paramedic: SecondParamedic,
          ambulance: Ambulance,
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
          <form style={{ width: "260px" }}>
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
                <h4 style={{ fontWeight: "500", color: "#777" }}>Team Name</h4>
              </div>
              <TextField
                type="text"
                id="duration-picker"
                placeholder="Team Name"
                required
                sx={{ width: "160px" }}
                value={TeamName}
                variant="outlined"
                onChange={(e) => {
                  setTeamName(e.target.value);
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
                <h4 style={{ fontWeight: "500", color: "#777" }}>Leader</h4>
              </div>
              <TextField
                type="text"
                id="duration-picker"
                placeholder="Leader"
                required
                sx={{ width: "160px" }}
                value={Leader}
                variant="outlined"
                onChange={(e) => {
                  setLeader(e.target.value);
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
                <h4 style={{ fontWeight: "500", color: "#777" }}>Driver</h4>
              </div>
              <TextField
                type="text"
                id="duration-picker"
                placeholder="Driver"
                required
                sx={{ width: "160px" }}
                value={Driver}
                variant="outlined"
                onChange={(e) => {
                  setDriver(e.target.value);
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
                <h4 style={{ fontWeight: "500", color: "#777" }}>Paramedic</h4>
              </div>
              <TextField
                type="text"
                id="duration-picker"
                placeholder="Paramedic"
                required
                sx={{ width: "160px" }}
                value={FirstParamedic}
                variant="outlined"
                onChange={(e) => {
                  setFirstParamedic(e.target.value);
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
                <h4 style={{ fontWeight: "500", color: "#777" }}>Paramedic</h4>
              </div>
              <TextField
                type="text"
                id="duration-picker"
                placeholder="Paramedic"
                required
                sx={{ width: "160px" }}
                value={SecondParamedic}
                variant="outlined"
                onChange={(e) => {
                  setSecondParamedic(e.target.value);
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
                <h4 style={{ fontWeight: "500", color: "#777" }}>Ambulance</h4>
              </div>
              <TextField
                type="text"
                id="duration-picker"
                placeholder="Ambulance"
                required
                sx={{ width: "160px" }}
                value={Ambulance}
                variant="outlined"
                onChange={(e) => {
                  setAmbulance(e.target.value);
                }}
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
