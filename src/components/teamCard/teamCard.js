import React, { useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import { BsPersonFill } from "react-icons/bs";
import { FaAmbulance } from "react-icons/fa";
import { DeleteRounded, SaveAsRounded, Edit } from "@mui/icons-material/";

export default function TeamCard(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [TeamName, setTeamName] = useState(props.team_name);
  const [LeaderName, setLeaderName] = useState(props.mission_leader);
  const [DriverName, setDriverName] = useState(props.driver);
  const [FirstParamedicName, setFirstParamedicName] = useState(
    props.first_paramedic
  );
  const [SecondParamedicName, setSecondParamedicName] = useState(
    props.second_paramedic
  );
  const [AmbulanceName, setAmbulance] = useState(props.ambulance);

  const handleUpdate = () => {
    axios
      .patch(`${process.env.REACT_APP_URL}team/${props._id}`, {
        team_name: TeamName,
        mission_leader: LeaderName,
        driver: DriverName,
        first_paramedic: FirstParamedicName,
        second_paramedic: SecondParamedicName,
        ambulance: AmbulanceName,
      })
      .then((response) => {
        console.log(response);
        props.reFetch();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="team-card">
      <h1>
        {isEditing ? (
          <TextField
            className="EditInput"
            size="large"
            style={{ width: 150 + "px" }}
            defaultValue={props.team_name}
            onChange={(e) => {
              console.log(e.target.value);
              setTeamName(e.target.value);
            }}
            label="Team Name"
          />
        ) : (
          TeamName
        )}
        <span>
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
        </span>
      </h1>
      <div className="team-card-body">
        <span>
          <BsPersonFill />
          <strong>
            {isEditing ? (
              <TextField
                className="EditInput small-card-input"
                size="small"
                // style={{ width: 90 + "px" }}
                defaultValue={props.mission_leader}
                onChange={(e) => {
                  console.log(e.target.value);
                  setLeaderName(e.target.value);
                }}
                label="Leader"
              />
            ) : (
              LeaderName
            )}
          </strong>
          - Leader
        </span>
        <span>
          <BsPersonFill />
          <strong>
            {isEditing ? (
              <TextField
                className="EditInput small-card-input"
                size="small"
                // style={{ width: 90 + "px" }}
                defaultValue={props.driver}
                onChange={(e) => {
                  console.log(e.target.value);
                  setDriverName(e.target.value);
                }}
                label="Driver"
              />
            ) : (
              DriverName
            )}
          </strong>
          - Driver
        </span>
        <span>
          <BsPersonFill />
          <strong>
            {isEditing ? (
              <TextField
                className="EditInput small-card-input"
                size="small"
                // style={{ width: 90 + "px" }}
                defaultValue={props.first_paramedic}
                onChange={(e) => {
                  console.log(e.target.value);
                  setFirstParamedicName(e.target.value);
                }}
                label="Paramedic"
              />
            ) : (
              FirstParamedicName
            )}
          </strong>
          - Paramedic
        </span>
        {props.second_paramedic && (
          <span>
            <BsPersonFill />
            <strong>
              {isEditing ? (
                <TextField
                  className="EditInput small-card-input"
                  size="small"
                  // style={{ width: 90 + "px" }}
                  defaultValue={props.second_paramedic}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setSecondParamedicName(e.target.value);
                  }}
                  label="Paramedic"
                />
              ) : (
                SecondParamedicName
              )}
            </strong>
            - Paramedic
          </span>
        )}
        <span style={{ marginLeft: 4 + "px" }}>
          <FaAmbulance />
          <strong>
            {isEditing ? (
              <TextField
                className="EditInput small-card-input"
                size="small"
                // style={{ width: 90 + "px", marginLeft: 2 + "px" }}
                defaultValue={props.ambulance}
                onChange={(e) => {
                  console.log(e.target.value);
                  setAmbulance(e.target.value);
                }}
                label="Ambulance"
              />
            ) : (
              AmbulanceName
            )}
          </strong>
          - Ambulance
        </span>
      </div>
    </div>
  );
}
