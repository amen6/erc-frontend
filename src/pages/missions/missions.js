import "./missions.css";
import Loader from "../../components/loader/loader";
import ConfirmationPopup from "../../components/confirmationPopup/confirmationPopup";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import debounce from "lodash/debounce";
import { Box } from "@mui/system";
import {
  AppRegistrationSharp,
  DeleteRounded,
  SaveAsRounded,
} from "@mui/icons-material/";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import useFetch from "../../components/customFetch/customFetch";

function createData(
  _id,
  date,
  ambulance_id,
  depart,
  arrive,
  done,
  mission_type,
  case_id,
  description,
  patient_id,
  from_location,
  to_location,
  infectious_disease,
  doctor
) {
  return {
    _id,
    date,
    ambulance_id,
    depart,
    arrive,
    done,
    mission_type,
    case_id,
    description,
    patient_id,
    from_location,
    to_location,
    infectious_disease,
    doctor,
  };
}

function Users(props) {
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setLoading(true);
    document.title = "Missions";
    getData();
  }, []);

  const ambulancesData = useFetch("ambulance");
  const casesData = useFetch("case");
  const patientsData = useFetch("patient/name/");
  const hospitalsData = useFetch("hospital");

  const rows =
    Data ||
    [].map((item) => {
      return createData(
        item._id,
        item.date,
        item.ambulance_id,
        item.depart,
        item.return,
        item.done,
        item.mission_type,
        item.case_id,
        item.description,
        item.patient_id,
        item.from_location,
        item.to_location,
        item.infectious_disease,
        item.doctor
      );
    });

  const handleSearch = debounce((searchValue) => {
    console.log(searchValue);
  }, 500);

  const handleDelete = (rowsDeleted) => {
    axios
      .delete(`${process.env.REACT_APP_URL}mission/${rowsDeleted}`, {})
      .then((response) => {
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getData = () => {
    axios
      .get("${process.env.REACT_APP_URL}mission")
      .then((response) => {
        console.log(response);
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleUpdate = (rowData) => {
    setEditingRow(true);
    axios
      .patch(`${process.env.REACT_APP_URL}mission/${rowData[0]}`, {
        date: rowData[1],
        ambulance_id: rowData[2],
        depart: rowData[3],
        arrive: rowData[4],
        done: rowData[5],
        mission_type: rowData[6],
        case_id: rowData[7],
        description: rowData[8],
        patient_id: rowData[9],
        from_location: rowData[10],
        to_location: rowData[11],
        infectious_disease: rowData[12],
        doctor: rowData[13],
      })
      .then((response) => {
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSwitch = (id, value) => {
    axios
      .patch(`${process.env.REACT_APP_URL}mission/${id}`, {
        done: value,
      })
      .then((response) => {
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showConfirmationBox = () => {
    document.querySelector(".confirmation-popup").showModal();
  };
  const columns = [
    {
      name: "_id",
      label: "ID",
      options: {
        display: "excluded",
      },
    },
    {
      name: "date",
      label: "Date",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;
          let date = new Date(value);

          return (
            <div style={{ textAlign: "center" }}>
              {isEditing ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Choose Time"
                    className="mui-datetimepicker"
                    defaultValue={dayjs(date)}
                    onChange={(e) => {
                      let time = new Date(e.$d).toISOString();
                      updateValue(time);
                    }}
                  />
                </LocalizationProvider>
              ) : (
                date.toLocaleString()
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "ambulance_id",
      label: "Ambulance",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          return (
            <div style={{ textAlign: "center" }}>
              {isEditing ? (
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Ambulance
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={value._id}
                    size="large"
                    onChange={(e, t) => {
                      updateValue({
                        _id: t.props.value,
                        name: t.props.children,
                      });
                    }}
                    sx={{ width: "160px" }}
                    label="Ambulance"
                  >
                    {!ambulancesData.isLoading ? (
                      ambulancesData.data.data.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                          {option.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem>Loading...</MenuItem>
                    )}
                  </Select>
                </FormControl>
              ) : (
                value.name
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "depart",
      label: "Depart",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;
          let date = new Date(value);

          return (
            <div style={{ textAlign: "center" }}>
              {isEditing ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Choose Time"
                    className="mui-datetimepicker"
                    defaultValue={dayjs(date)}
                    onChange={(e) => {
                      let time = new Date(e.$d).toISOString();
                      updateValue(time);
                    }}
                  />
                </LocalizationProvider>
              ) : (
                date.toLocaleString()
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "arrive",
      label: "Arrive",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;
          let date = new Date(value);

          return (
            <div style={{ textAlign: "center" }}>
              {isEditing ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Choose Time"
                    className="mui-datetimepicker"
                    defaultValue={dayjs(date)}
                    onChange={(e) => {
                      let time = new Date(e.$d).toISOString();
                      updateValue(time);
                    }}
                  />
                </LocalizationProvider>
              ) : (
                date.toLocaleString()
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "done",
      label: "Completed",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;
          const rowData = tableMeta.rowData;
          let id = rowData[0];
          return (
            <div style={{ textAlign: "center" }}>
              <Switch
                checked={value}
                onChange={(e) => {
                  handleSwitch(id, !value);
                  value = !value;
                }}
              />
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "mission_type",
      label: "Mission Type",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;

          const isEditing = rowIndex === editingRow;
          return (
            <div style={{ textAlign: "center" }}>
              {isEditing ? (
                <TextField
                  className="EditInput"
                  defaultValue={value}
                  label="Type"
                  onChange={(e) => {
                    updateValue(e.target.value);
                  }}
                />
              ) : (
                value
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "case_id",
      label: "Case",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          return (
            <div style={{ textAlign: "center" }}>
              {isEditing ? (
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Case
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={value._id}
                    size="large"
                    onChange={(e, t) => {
                      updateValue({
                        _id: t.props.value,
                        name: t.props.children,
                      });
                    }}
                    sx={{ width: "160px" }}
                    label="Case"
                  >
                    {casesData.data.data.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                value.name
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "description",
      label: "Description",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;

          const isEditing = rowIndex === editingRow;
          return (
            <div style={{ textAlign: "center" }}>
              {isEditing ? (
                <TextField
                  className="EditInput"
                  defaultValue={value}
                  onChange={(e) => {
                    updateValue(e.target.value);
                  }}
                  label="Description"
                />
              ) : (
                value
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "patient_id",
      label: "Patient",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;
          if (patientsData.isLoading) return "loading";

          return (
            <div style={{ textAlign: "center" }}>
              {isEditing ? (
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Patient
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={value._id}
                    size="large"
                    onChange={(e, t) => {
                      updateValue({
                        _id: t.props.value,
                        first_name: t.props.first_name,
                        last_name: t.props.last_name,
                      });
                      console.log(e, t, value);
                    }}
                    sx={{ width: "160px" }}
                    label="Patient"
                  >
                    {!patientsData.isLoading ? (
                      patientsData.data.response.map((option) => (
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
              ) : (
                value.first_name + " " + value.last_name
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "from_location",
      label: "From ",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;
          let name = value.name || value;
          let id = value._id || value;

          return (
            <div style={{ textAlign: "center" }}>
              {isEditing ? (
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Patient
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={id}
                    size="large"
                    onChange={(e, t) => {
                      updateValue({
                        _id: t.props.value,
                        name: t.props.children,
                      });
                    }}
                    sx={{ width: "160px" }}
                    label="Patient"
                  >
                    (
                    <MenuItem key={"home"} value={"home"}>
                      home
                    </MenuItem>
                    )
                    {!hospitalsData.isLoading ? (
                      hospitalsData.data.data.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                          {option.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem>Loading...</MenuItem>
                    )}
                  </Select>
                </FormControl>
              ) : (
                name
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "to_location",
      label: "To",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;
          let name = value.name || value;
          let id = value._id || value;

          return (
            <div style={{ textAlign: "center" }}>
              {isEditing ? (
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Patient
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={id}
                    size="large"
                    onChange={(e, t) => {
                      updateValue({
                        _id: t.props.value,
                        name: t.props.children,
                      });
                    }}
                    sx={{ width: "160px" }}
                    label="Patient"
                  >
                    (
                    <MenuItem key={"home"} value={"home"}>
                      home
                    </MenuItem>
                    )
                    {!hospitalsData.isLoading ? (
                      hospitalsData.data.data.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                          {option.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem>Loading...</MenuItem>
                    )}
                  </Select>
                </FormControl>
              ) : (
                name
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "infectious_disease",
      label: "Infectious Disease",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;

          const isEditing = rowIndex === editingRow;
          return (
            <div style={{ textAlign: "center" }}>
              {isEditing ? (
                <TextField
                  className="EditInput"
                  defaultValue={value}
                  onChange={(e) => {
                    updateValue(e.target.value);
                  }}
                  label="Infectious Disease"
                />
              ) : (
                value
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "doctor",
      label: "Doctor",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;

          const isEditing = rowIndex === editingRow;
          return (
            <div style={{ textAlign: "center" }}>
              {isEditing ? (
                <TextField
                  className="EditInput"
                  defaultValue={value}
                  onChange={(e) => {
                    updateValue(e.target.value);
                  }}
                  label="Doctor"
                />
              ) : (
                value
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowData = tableMeta.rowData;
          return (
            <>
              {isEditing && editingRow === tableMeta.rowIndex ? (
                <SaveAsRounded
                  className="save-btn"
                  sx={{
                    color: "#5cbdcb",
                    cursor: "pointer",
                    justifyItems: "center",
                    alignItems: "center",

                    "&:hover": {
                      transform: "scale(1.3)",
                      transition: "0.2s ease-out",
                    },
                  }}
                  onClick={() => {
                    setIsEditing(false);
                    setEditingRow(null);
                    handleUpdate(rowData);
                  }}
                />
              ) : (
                <AppRegistrationSharp
                  className="edit-btn"
                  onClick={() => {
                    setIsEditing(true);
                    setEditingRow(tableMeta.rowIndex);
                  }}
                  sx={{
                    color: "#5cbdcb",
                    cursor: "pointer",
                    justifyItems: "center",
                    alignItems: "center",

                    "&:hover": {
                      transform: "scale(1.3)",
                      transition: "0.2s ease-out",
                    },
                  }}
                />
              )}
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              <DeleteRounded
                sx={{
                  color: "#5cbdcb",
                  cursor: "pointer",
                  justifyItems: "center",
                  alignItems: "center",

                  "&:hover": {
                    transform: "scale(1.3)",
                    transition: "0.2s ease-out",
                  },
                }}
                className="delete-btn"
                onClick={() => {
                  setDeleteId(rowData[0]);
                  showConfirmationBox();
                }}
              />
            </>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    responsive: "simple",
    selectableRows: "none",
    search: true,
    searchPlaceholder: "Search for User",
    onSearchChange: (searchValue) => handleSearch(searchValue),
    download: true,
    print: true,
    pagination: true,
    rowsPerPage: 5,
    loaded: true,
    rowsPerPageOptions: [5],
    onRowsDelete: handleDelete,
    fullScreen: true,
  };
  return (
    <>
      {Loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>
          <Box sx={{ maxWidth: "75%", margin: "auto" }} className="mui-table">
            <MUIDataTable
              title={"Missions"}
              data={rows}
              columns={columns}
              options={options}
              sx={{
                width: "70%",
                marginLeft: "390px",
                marginY: "190px",
                zIndex: 1,
                textAlign: "center",
              }}
            />
            <ConfirmationPopup
              handleDelete={handleDelete}
              id={deleteId}
              item={"mission"}
            />
          </Box>
        </div>
      )}
    </>
  );
}
export default Users;
