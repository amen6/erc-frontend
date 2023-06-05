import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Switch,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";
import { alpha, styled } from "@mui/material/styles";

function AddNewMission(props) {
  const [MissionDate, setMissionDate] = useState("");
  const [Ambulance, setAmbulance] = useState("");
  const [Depart, setDepart] = useState("");
  const [Arrive, setArrive] = useState("");
  const [Completed, setCompleted] = useState(false);
  const [MissionType, setMissionType] = useState("");
  const [Case, setCase] = useState("");
  const [Description, setDescription] = useState("");
  const [Patient, setPatient] = useState("");
  const [FromLocation, setFromLocation] = useState("");
  const [ToLocation, setToLocation] = useState("");
  const [InfectiousDisease, setInfectiousDisease] = useState("");
  const [Doctor, setDoctor] = useState("");

  const authHeader = useAuthHeader();

  const cleanState = () => {
    setMissionDate("");
    setAmbulance("");
    setDepart("");
    setArrive("");
    setMissionType("");
    setCase("");
    setPatient("");
    setFromLocation("");
    setToLocation("");
    setInfectiousDisease("");
  };

  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_URL}mission/`,
        {
          date: MissionDate,
          ambulance_id: Ambulance,
          depart: Depart,
          arrive: Arrive,
          done: Completed,
          mission_type: MissionType,
          case_id: Case,
          description: Description,
          patient_id: Patient,
          from_location: FromLocation,
          to_location: ToLocation,
          infectious_disease: InfectiousDisease,
          doctor: Doctor,
        },
        {
          headers: {
            Authorization: authHeader(),
          },
        }
      )
      .then((response) => {
        console.log(response);
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

  return (
    <>
      <Dialog open={props.open} fullWidth={true} maxWidth={"sm"}>
        <DialogTitle
          sx={{ color: "var(--black)", fontSize: "18px", textAlign: "center" }}
        >
          Add New Mission
        </DialogTitle>
        <DialogContent>
          <form className="wideForm" onSubmit={handleAdd}>
            <div className="inputContainer">
              <div className="labelContainer">
                <h4 className="labelTitle">Mission Date</h4>
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  required
                  sx={{ maxWidth: "235px" }}
                  onChange={(e) => {
                    console.log(e);
                    let time = new Date(e.$d);
                    time = time.toISOString();
                    setMissionDate(time);
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className="inputContainer">
              <div className="labelContainer">
                <h4 className="labelTitle">Ambulance</h4>
              </div>
              <FormControl sx={{ width: "100%" }}>
                <Select
                  required
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={Ambulance}
                  size="large"
                  sx={{ maxWidth: "235px" }}
                  onChange={(e) => {
                    setAmbulance(e.target.value);
                  }}
                >
                  {!props.ambulancesData.isLoading ? (
                    props.ambulancesData.data.data.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>Loading...</MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="inputContainer">
              <div className="labelContainer">
                <h4 className="labelTitle">Depart</h4>
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  required
                  sx={{ maxWidth: "235px" }}
                  onChange={(e) => {
                    let time = new Date(e.$d).toISOString();
                    setDepart(time);
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className="inputContainer">
              <div className="labelContainer">
                <h4 className="labelTitle">Arrive</h4>
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  required
                  sx={{ maxWidth: "235px" }}
                  onChange={(e) => {
                    let time = new Date(e.$d).toISOString();
                    setArrive(time);
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className="inputContainer">
              <div className="labelContainer">
                <h4 className="labelTitle">Mission Type</h4>
              </div>
              <TextField
                required
                type="text"
                id="duration-picker"
                placeholder="Mission Type"
                value={MissionType}
                variant="outlined"
                onChange={(e) => {
                  setMissionType(e.target.value);
                }}
              />
            </div>
            <div className="inputContainer">
              <div className="labelContainer">
                <h4 className="labelTitle">Case </h4>
              </div>
              <FormControl sx={{ width: "100%" }}>
                <Select
                  required
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={Case}
                  size="large"
                  onChange={(e) => {
                    setCase(e.target.value);
                  }}
                  sx={{ maxWidth: "235px" }}
                >
                  {props.casesData.data.data.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="inputContainer">
              <div className="labelContainer">
                <h4 className="labelTitle">Description </h4>
              </div>
              <TextField
                required
                type="text"
                id="duration-picker"
                placeholder="Description "
                value={Description}
                variant="outlined"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="inputContainer">
              <div className="labelContainer">
                <h4 className="labelTitle">Patient </h4>
              </div>
              <FormControl sx={{ width: "100%" }}>
                <Select
                  required
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={Patient}
                  size="large"
                  onChange={(e) => {
                    setPatient(e.target.value);
                  }}
                  sx={{ maxWidth: "235px" }}
                >
                  {!props.patientsData.isLoading ? (
                    props.patientsData.data.response.map((option) => (
                      <MenuItem
                        key={option._id}
                        value={option._id}
                        first_name={option.first_name}
                        last_name={option.last_name}
                      >
                        {option.first_name + " " + option.last_name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>Loading...</MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="inputContainer">
              <div className="labelContainer">
                <h4 className="labelTitle">From </h4>
              </div>
              <FormControl sx={{ width: "100%" }}>
                <Select
                  required
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={FromLocation}
                  size="large"
                  onChange={(e) => {
                    setFromLocation(e.target.value);
                  }}
                  sx={{ maxWidth: "235px" }}
                >
                  <MenuItem key={"home"} value={"home"}>
                    Home
                  </MenuItem>
                  {!props.hospitalsData.isLoading ? (
                    props.hospitalsData.data.data.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>Loading...</MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="inputContainer">
              <div className="labelContainer">
                <h4 className="labelTitle">To</h4>
              </div>
              <FormControl sx={{ width: "100%" }}>
                <Select
                  required
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={ToLocation}
                  size="large"
                  onChange={(e) => {
                    setToLocation(e.target.value);
                  }}
                  sx={{ maxWidth: "235px" }}
                >
                  <MenuItem key={"home"} value={"home"}>
                    home
                  </MenuItem>
                  {!props.hospitalsData.isLoading ? (
                    props.hospitalsData.data.data.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>Loading...</MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>

            <div className="inputContainer">
              <div className="labelContainer">
                <h4 className="labelTitle">Infectious Disease</h4>
              </div>
              <TextField
                required
                type="text"
                id="duration-picker"
                placeholder="Infectious Disease"
                value={InfectiousDisease}
                variant="outlined"
                onChange={(e) => {
                  setInfectiousDisease(e.target.value);
                }}
              />
            </div>
            <div className="inputContainer">
              <div className="labelContainer">
                <h4 className="labelTitle">Doctor</h4>
              </div>
              <TextField
                required
                type="text"
                id="duration-picker"
                placeholder="Doctor"
                value={Doctor}
                variant="outlined"
                onChange={(e) => {
                  setDoctor(e.target.value);
                }}
              />
            </div>

            <div className="inputContainer">
              <div className="labelContainer">
                <h4 className="labelTitle">Completed</h4>
              </div>
              <StyledSwitch
                required
                checked={Completed}
                onChange={() => {
                  setCompleted(!Completed);
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

export default AddNewMission;
