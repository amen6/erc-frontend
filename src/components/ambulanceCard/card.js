import React from "react";
import { useState, useRef } from "react";
import { Switch, TextField, Slider } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { DeleteRounded, SaveAsRounded, Edit } from "@mui/icons-material/";
import axios from "axios";

export default function Card(props) {
  const [isShowing, setIsShowing] = useState(false);
  const [zIndex, setZIndex] = useState(10);
  const [isEditing, setIsEditing] = useState(false);
  const [CardName, setCardName] = useState(props.name);
  const [FuelType, setFuelType] = useState(props.fuel_type);
  const timeRef = useRef(null);

  const handleClick = () => {
    if (isShowing) {
      setIsShowing(false);
      if (zIndex > 10) {
        setZIndex(10);
      }
    } else {
      setIsShowing(true);
      setZIndex(zIndex + 1);
    }
  };

  const handleSwitch = (id, value) => {
    console.log(id, value);
    axios
      .patch(
        `${process.env.REACT_APP_URL}ambulance/${id}`,
        {
          out_of_service: value,
        },
        {
          headers: { Authorization: props.authHeader() },
        }
      )
      .then((response) => {
        console.log(response);
        props.reFetch();
        props.handleCardsClick();
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

  const handleUpdate = () => {
    axios
      .patch(
        `${process.env.REACT_APP_URL}ambulance/${props._id}`,
        {
          name: CardName,
          fuel_type: FuelType,
        },
        {
          headers: { Authorization: props.authHeader() },
        }
      )
      .then((response) => {
        props.reFetch();
        props.handleCardsClick();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSwiper = (value) => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
    timeRef.current = setTimeout(() => {
      axios
        .patch(
          `${process.env.REACT_APP_URL}ambulance/${props._id}`,
          {
            fuel_percentage: value,
          },
          {
            headers: { Authorization: props.authHeader() },
          }
        )
        .then((response) => {
          props.reFetch();
          props.handleCardsClick();
        })
        .catch((error) => {
          console.log(error);
        });
    }, 500);
  };
  return (
    <>
      <div className={`card${isShowing ? " show" : ""}`} style={{ zIndex }}>
        <div className="card__image-holder">
          <img
            className="card__image"
            src={`${process.env.REACT_APP_URL}${props.image}`}
            alt={props.image}
          />
        </div>
        <div className="card-title">
          <button
            className="toggle-info btn"
            onClick={() => {
              handleClick();
              props.handleCardsClick();
            }}
          >
            <span className="left"></span>
            <span className="right"></span>
          </button>

          <h2
            style={{ color: `${props.outOfService ? "rgb(250, 0 ,0)" : ""}` }}
          >
            {isEditing ? (
              <TextField
                className="EditInput"
                size="small"
                defaultValue={props.name}
                label="Ambulance"
                onChange={(e) => {
                  setCardName(e.target.value);
                }}
                sx={{ width: 150, marginTop: 1 }}
                required
              />
            ) : (
              <>{CardName ? CardName : props.name}</>
            )}
          </h2>
        </div>
        <div className="card-flap flap1">
          <div className="card-description">
            <>
              <span>
                <strong>Fuel: </strong>
                <Slider
                  sx={{
                    overflow: "visible",
                    width: "50%",
                    marginLeft: 10 + "px",
                  }}
                  defaultValue={props.fuelPercentage}
                  step={10}
                  marks
                  min={0}
                  max={100}
                  onChange={(e) => {
                    handleSwiper(e.target.value);
                  }}
                />
              </span>
              <span>
                <strong>Fuel Type: </strong>
                {isEditing ? (
                  <TextField
                    className="EditInput"
                    size="small"
                    defaultValue={props.fuelType}
                    label="Fuel Type"
                    onChange={(e) => {
                      setFuelType(e.target.value);
                    }}
                    sx={{ width: 150, marginTop: 1 }}
                    required
                  />
                ) : (
                  <>{FuelType ? FuelType : props.fuelType}</>
                )}
              </span>
              <span>
                <strong>Available: </strong>
                <StyledSwitch
                  checked={!props.outOfService}
                  onChange={() => {
                    handleSwitch(props._id, !props.outOfService);
                  }}
                />
              </span>
            </>
          </div>
          <div className="card-flap flap2">
            <div className="card-actions">
              <strong>Actions:</strong>
              <div>
                {isEditing ? (
                  <SaveAsRounded
                    onClick={() => {
                      setIsEditing(false);
                      handleUpdate();
                    }}
                  />
                ) : (
                  <Edit
                    onClick={() => {
                      setIsEditing(true);
                    }}
                  />
                )}
                <DeleteRounded
                  className="delete"
                  onClick={(e) => {
                    props.showConfirmationBox(props._id);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
