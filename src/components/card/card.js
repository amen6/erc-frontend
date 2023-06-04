import React from "react";
import { useState } from "react";
import { Switch, TextField } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { DeleteRounded, SaveAsRounded, Edit } from "@mui/icons-material/";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";

import "./card.css";

export default function Card(props) {
  const [isShowing, setIsShowing] = useState(false);
  const [zIndex, setZIndex] = useState(10);
  const [isEditing, setIsEditing] = useState(false);
  const [CardName, setCardName] = useState(props.name);
  const [CardCode, setCardCode] = useState(props.hospital_code);
  const authHeader = useAuthHeader();

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
      .patch(
        `${process.env.REACT_APP_URL}hospital/${id}`,
        {
          available: value,
        },
        {
          headers: {
            Authorization: authHeader(),
          },
        }
      )
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
      .patch(
        `${process.env.REACT_APP_URL}hospital/${props._id}`,
        {
          name: CardName,
          hospital_code: CardCode,
        },
        {
          headers: {
            Authorization: authHeader(),
          },
        }
      )
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

          <h2 style={{ color: `${!props.available ? "rgb(250, 0 ,0)" : ""}` }}>
            {isEditing ? (
              <TextField
                className="EditInput"
                size="small"
                defaultValue={props.name}
                label="Hospital"
                onChange={(e) => {
                  setCardName(e.target.value);
                }}
                sx={{ width: 150 }}
                required
              />
            ) : (
              <>{CardName ? CardName : props.name} hospital</>
            )}
          </h2>
        </div>
        <div className="card-flap flap1">
          <div className="card-description">
            <>
              <span>
                <strong>Code: </strong>
                {isEditing ? (
                  <TextField
                    className="EditInput"
                    size="small"
                    defaultValue={props.hospital_code}
                    label="Code"
                    onChange={(e) => {
                      setCardCode(e.target.value);
                    }}
                    sx={{ width: 150, marginTop: 1 }}
                    required
                  />
                ) : (
                  <>{CardCode ? CardCode : props.hospital_code}</>
                )}
              </span>
              <span>
                <strong>Available: </strong>
                <StyledSwitch
                  checked={props.available}
                  onChange={(e) => {
                    handleSwitch(props._id, !props.available);
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
