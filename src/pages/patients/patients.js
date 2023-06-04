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
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { TextField } from "@mui/material";
import useFetch from "../../components/customFetch/customFetch";

function createData(
  _id,
  first_name,
  last_name,
  date_of_birth,
  phone,
  address,
  description,
  guarantor
) {
  return {
    _id,
    first_name,
    last_name,
    date_of_birth,
    phone,
    address,
    description,
    guarantor,
  };
}

function Patients(props) {
  const [editingRow, setEditingRow] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    document.title = "Patients";
    reFetch();
  }, []);

  const { data, error, isLoading, reFetch } = useFetch("patient");
  console.log(data, error, isLoading, reFetch);

  const rows =
    data.response ||
    [].map((item) => {
      return createData(
        item._id,
        item.first_name,
        item.last_name,
        item.date_of_birth,
        item.phone,
        item.address,
        item.description,
        item.guarantor
      );
    });

  const handleSearch = debounce((searchValue) => {
    console.log(searchValue);
  }, 500);

  const handleDelete = (rowsDeleted) => {
    axios
      .delete(`${process.env.REACT_APP_URL}paramedic/${rowsDeleted}`, {})
      .then((response) => {
        reFetch();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = (rowData) => {
    setEditingRow(true);
    axios
      .patch(`${process.env.REACT_APP_URL}paramedic/${rowData[0]}`, {
        first_name: rowData[1],
        last_name: rowData[2],
        date_of_birth: rowData[3],
        phone: rowData[4],
        address: rowData[5],
        description: rowData[6],
        guarantor: rowData[7],
      })
      .then((response) => {
        reFetch();
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
      name: "first_name",
      label: "First Name",
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
                  label="First Name"
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
      name: "last_name",
      label: "Last Name",
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
                  label="Last Name"
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
      name: "date_of_birth",
      label: "Date Of Birth",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;
          let date = new Date(value);

          return (
            <div style={{ textAlign: "center" }}>
              {isEditing ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Choose Time"
                    className="mui-datepicker"
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
      name: "phone",
      label: "Phone",
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
                  label="Phone"
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
      name: "address",
      label: "Address",
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
                  label="Address"
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
                  label="Address"
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
      name: "guarantor",
      label: "Guarantor",
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
                  label="Address"
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
    searchPlaceholder: "Search for Paramedic",
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
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>
          <Box sx={{ maxWidth: "75%", margin: "auto" }} className="mui-table">
            <MUIDataTable
              title={"Patients"}
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
              item={"paramedic"}
            />
          </Box>
        </div>
      )}
    </>
  );
}
export default Patients;
