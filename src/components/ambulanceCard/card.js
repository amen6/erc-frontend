import React from "react";
import { useState } from "react";
import { Switch, TextField, Slider, Box } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { DeleteRounded, SaveAsRounded, Edit } from "@mui/icons-material/";
import axios from "axios";

export default function Card(props) {
  const [isShowing, setIsShowing] = useState(false);
  const [zIndex, setZIndex] = useState(10);
  const [isEditing, setIsEditing] = useState(false);
  const [CardName, setCardName] = useState("");
  const [isOutOfService, setOutOfService] = useState("");
  const [FuelType, setFuelType] = useState("");

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
    axios
      .patch(`${process.env.REACT_APP_URL}ambulance/${id}`, {
        available: value,
      })
      .then((response) => {
        console.log(response);
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

  const handleUpdate = () => {
    axios
      .patch(`${process.env.REACT_APP_URL}ambulance/${props._id}`, {
        name: CardName,
        out_of_service: isOutOfService,
      })
      .then((response) => {
        props.getData();
      })
      .catch((error) => {
        console.log(error);
      });
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
                <bold>Fuel: </bold>
                <Slider
                  sx={{ overflow: "visible", width: "50%" }}
                  defaultValue={30}
                  step={10}
                  marks
                  min={0}
                  max={100}
                />
              </span>
              <span>
                <bold>Fuel Type: </bold>
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
                <bold>Available: </bold>
                <StyledSwitch
                  checked={props.available}
                  onChange={(e) => {
                    handleSwitch(props._id, !props.outOfService);
                  }}
                />
              </span>
            </>
          </div>
          <div className="card-flap flap2">
            <div className="card-actions">
              <bold>Actions:</bold>
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
