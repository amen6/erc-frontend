import React, { useState } from "react";
import "./addParamedics.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Switch,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";
import { alpha, styled } from "@mui/material/styles";

function AddNewTask(props) {
  const [NickName, setNickName] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [FatherName, setFatherName] = useState("");
  const [Citizenship, setCitizenship] = useState("");
  const [SejelPlace, setSejelPlace] = useState("");
  const [SejelNumber, setSejelNumber] = useState("");
  const [MotherName, setMotherName] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState("");
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [Password, setPassword] = useState("");
  const [Available, setAvailable] = useState(false);

  const authHeader = useAuthHeader();

  const cleanState = () => {
    setNickName("");
    setFirstName("");
    setLastName("");
    setFatherName("");
    setCitizenship("");
    setSejelPlace("");
    setSejelNumber("");
    setDateOfBirth("");
    setPhone("");
  };

  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_URL}paramedic/`,
        {
          nick_name: NickName,
          first_name: FirstName,
          father_name: FatherName,
          last_name: LastName,
          citizenship: Citizenship,
          sejel_place: SejelPlace,
          sejel_number: SejelNumber,
          mother_name: MotherName,
          date_of_birth: DateOfBirth,
          address: Address,
          phone: Phone,
          is_super_paramedic: Available,
          password: Password,
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
      <Dialog open={props.open} fullWidth={true} maxWidth={"sm"}>
        <DialogTitle
          sx={{ color: "var(--black)", fontSize: "18px", textAlign: "center" }}
        >
          Add New Paramedic
        </DialogTitle>
        <DialogContent>
          <form className="wideForm" onSubmit={handleAdd}>
            <div className="inputContainer">
              <div className="labelContainer">
                <h4 className="labelTitle">Nick Name</h4>
              </div>
              <TextField
                type="text"
                id="duration-picker"
                placeholder="Nick Name"
                required
                value={NickName}
                variant="outlined"
                onChange={(e) => {
                  setNickName(e.target.value);
                }}
              />
            </div>
            <div className="inputContainer">
              <div className="labelContainer">
                <h4 className="labelTitle">First Name</h4>
              </div>
              <TextField
                type="text"
                id="duration-picker"
                placeholder="First Name"
                required
                value={FirstName}
                variant="outlined"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            <div className="inputContainer">
              <div className="labelContainer">
                <h4 className="labelTitle">Last Name</h4>
              </div>
              <TextField
                type="text"
                id="duration-picker"
                placeholder="LastName"
                required
                value={LastName}
                variant="outlined"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <div className="inputContainer">
              <div className="labelContainer">
                <h4 className="labelTitle">Father Name</h4>
              </div>
              <TextField
                type="text"
                id="duration-picker"
                placeholder="Father Name"
                required
                value={FatherName}
                variant="outlined"
                onChange={(e) => {
                  setFatherName(e.target.value);
                }}
              />
            </div>
            <div className="inputContainer">
              <div className="labelContainer">
                <h4 className="labelTitle">Citizenship </h4>
              </div>
              <TextField
                type="text"
                id="duration-picker"
                placeholder="Citizenship"
                required
                value={Citizenship}
                variant="outlined"
                onChange={(e) => {
                  setCitizenship(e.target.value);
                }}
              />
            </div>
            <div className="inputContainer">
              <div className="labelContainer">
                <h4 className="labelTitle">Sejel Place </h4>
              </div>
              <TextField
                type="text"
                id="duration-picker"
                placeholder="Sejel Place "
                required
                value={SejelPlace}
                variant="outlined"
                onChange={(e) => {
                  setSejelPlace(e.target.value);
                }}
              />
            </div>
            <div className="inputContainer">
              <div className="labelContainer">
                <h4 className="labelTitle">Sejel Number </h4>
              </div>
              <TextField
                type="text"
                id="duration-picker"
                placeholder="Sejel Number "
                required
                value={SejelNumber}
                variant="outlined"
                onChange={(e) => {
                  setSejelNumber(e.target.value);
                }}
              />
            </div>
            <div className="inputContainer">
              <div className="labelContainer">
                <h4 className="labelTitle">Mother Name</h4>
              </div>
              <TextField
                type="text"
                id="duration-picker"
                placeholder="Mother Name"
                required
                value={MotherName}
                variant="outlined"
                onChange={(e) => {
                  setMotherName(e.target.value);
                }}
              />
            </div>

            <div className="inputContainer">
              <div className="labelContainer">
                <h4 className="labelTitle">Date Of Birth</h4>
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ maxWidth: "235px" }}
                  onChange={(e) => {
                    let time = new Date(e.$d).toISOString();
                    setDateOfBirth(time);
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className="inputContainer">
              <div className="labelContainer">
                <h4 className="labelTitle">Phone</h4>
              </div>
              <TextField
                type="text"
                id="duration-picker"
                placeholder="Phone"
                required
                value={Phone}
                variant="outlined"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
            <div className="inputContainer">
              <div className="labelContainer">
                <h4 className="labelTitle">Address</h4>
              </div>
              <TextField
                type="text"
                id="duration-picker"
                placeholder="Address"
                required
                value={Address}
                variant="outlined"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>
            <div className="inputContainer">
              <div className="labelContainer">
                <h4 className="labelTitle">Password</h4>
              </div>
              <TextField
                type="password"
                id="duration-picker"
                placeholder="Password"
                required
                value={Password}
                variant="outlined"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div className="inputContainer">
              <div className="labelContainer">
                <h4 className="labelTitle">Admin</h4>
              </div>
              <StyledSwitch
                checked={Available}
                onChange={() => {
                  setAvailable(!Available);
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
