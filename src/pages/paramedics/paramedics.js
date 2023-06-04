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
import { TextField, Switch } from "@mui/material";
import { useAuthHeader } from "react-auth-kit";
import useFetch from "../../components/customFetch/customFetch";

function createData(
  _id,
  nick_name,
  first_name,
  father_name,
  last_name,
  citizenship,
  sejel_place,
  sejel_number,
  mother_name,
  date_of_birth,
  address,
  phone,
  is_super_paramedic
) {
  return {
    _id,
    nick_name,
    first_name,
    father_name,
    last_name,
    citizenship,
    sejel_place,
    sejel_number,
    mother_name,
    date_of_birth,
    address,
    phone,
    is_super_paramedic,
  };
}

function Paramedics(props) {
  const [editingRow, setEditingRow] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const authHeader = useAuthHeader();
  useEffect(() => {
    document.title = "Paramedics";
    reFetch();
  }, []);

  const { data, error, isLoading, reFetch } = useFetch(
    "paramedic",
    authHeader()
  );

  const rows =
    data.data ||
    [].map((item) => {
      return createData(
        item._id,
        item.nick_name,
        item.first_name,
        item.father_name,
        item.last_name,
        item.citizenship,
        item.sejel_place,
        item.sejel_number,
        item.mother_name,
        item.date_of_birth,
        item.address,
        item.phone,
        item.is_super_paramedic
      );
    });

  const handleSearch = debounce((searchValue) => {
    console.log(searchValue);
  }, 500);

  const handleDelete = (rowsDeleted) => {
    axios
      .delete(`${process.env.REACT_APP_URL}paramedic/${rowsDeleted}`, {
        headers: {
          Authorization: authHeader(),
        },
      })
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
      .patch(
        `${process.env.REACT_APP_URL}paramedic/${rowData[0]}`,
        {
          nick_name: rowData[1],
          first_name: rowData[2],
          father_name: rowData[3],
          last_name: rowData[4],
          citizenship: rowData[5],
          sejel_place: rowData[6],
          sejel_number: rowData[7],
          mother_name: rowData[8],
          date_of_birth: rowData[9],
          address: rowData[10],
          phone: rowData[11],
          is_super_paramedic: rowData[12],
        },
        {
          headers: {
            Authorization: authHeader(),
          },
        }
      )
      .then((response) => {
        reFetch();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSwitch = (id, value) => {
    axios
      .patch(
        `${process.env.REACT_APP_URL}paramedic/${id}`,
        {
          is_super_paramedic: value,
        },
        {
          headers: {
            Authorization: authHeader(),
          },
        }
      )
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
      name: "nick_name",
      label: "Nick Name",
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
                  label="Nick Name"
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
      name: "father_name",
      label: "Father Name",
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
                  label="Father"
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
      name: "citizenship",
      label: "Citizenship",
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
                  label="Citizenship"
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
      name: "sejel_place",
      label: "Sejel Place",
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
                  label="Sejel Place"
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
      name: "sejel_number",
      label: "Sejel Number",
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
                  label="Sejel Number"
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
      name: "mother_name",
      label: "Mother Name",
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
                  label="Sejel Place"
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
      name: "is_super_paramedic",
      label: "Super Paramedic",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const rowData = tableMeta.rowData;
          const id = rowData[0];

          const isEditing = rowIndex === editingRow;
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
                    color: "#333",
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
                    color: "#333",
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
                  color: "#333",
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
              title={"Paramedics"}
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
export default Paramedics;
