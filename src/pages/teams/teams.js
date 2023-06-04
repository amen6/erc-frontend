import React, { useState } from "react";
import "./teams.css";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";
import Loading from "../../components/loader/loader";
import TeamCard from "../../components/teamCard/teamCard";
import useFetch from "../../components/customFetch/customFetch";
import ConfirmationPopup from "../../components/confirmationPopup/confirmationPopup";
import { AddCircle } from "@mui/icons-material/";

export default function TeamsPage() {
  const [DeleteId, setDeleteId] = useState("");
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

  console.log(data, isLoading, error);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <AddCircle className="circular-add" />
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
      <ConfirmationPopup
        handleDelete={handleDelete}
        id={DeleteId}
        item={"team"}
      />
    </>
  );
}
