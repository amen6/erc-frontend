import React, { useState } from "react";
import "./teams.css";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";
import Loading from "../../components/loader/loader";
import TeamCard from "../../components/teamCard/teamCard";
import useFetch from "../../components/customFetch/customFetch";
import ConfirmationPopup from "../../components/confirmationPopup/confirmationPopup";
import AddTeam from "../../components/addTeam/addTeam";
import { AddCircle } from "@mui/icons-material/";

export default function TeamsPage() {
  const [DeleteId, setDeleteId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const authHeader = useAuthHeader();
  let { data, isLoading, error, reFetch } = useFetch("team", authHeader());

  const showConfirmationBox = (deleteid) => {
    setDeleteId(deleteid);
    document.querySelector(".confirmation-popup").showModal();
  };
  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_URL}team/${id}`, {
        headers: {
          Authorization: authHeader(),
        },
      })
      .then((response) => {
        console.log(response);
        reFetch();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  console.log(data, isLoading, error);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <AddCircle className="circular-add" onClick={handleClickOpen} />
          <div className="team-cards-container">
            {data.data.map((e) => {
              return (
                <TeamCard
                  {...e}
                  showConfirmationBox={showConfirmationBox}
                  reFetch={reFetch}
                  authHeader={authHeader}
                />
              );
            })}
          </div>
        </>
      )}
      <AddTeam handleClose={handleClose} open={dialogOpen} reFetch={reFetch} />
      <ConfirmationPopup
        handleDelete={handleDelete}
        id={DeleteId}
        item={"team"}
      />
    </>
  );
}
