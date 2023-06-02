import React, { useState } from "react";
import "./teams.css";
import axios from "axios";
import Loading from "../../components/loader/loader";
import TeamCard from "../../components/teamCard/teamCard";
import useFetch from "../../components/customFetch/customFetch";
import ConfirmationPopup from "../../components/confirmationPopup/confirmationPopup";

export default function TeamsPage() {
  const [DeleteId, setDeleteId] = useState("");
  let { data, isLoading, error, reFetch } = useFetch("team");

  const showConfirmationBox = (deleteid) => {
    setDeleteId(deleteid);
    document.querySelector(".confirmation-popup").showModal();
  };
  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_URL}team/${id}`, {})
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
        <div className="team-cards-container">
          {data.data.map((e) => {
            return (
              <TeamCard
                {...e}
                showConfirmationBox={showConfirmationBox}
                reFetch={reFetch}
              />
            );
          })}
        </div>
      )}
      <ConfirmationPopup
        handleDelete={handleDelete}
        id={DeleteId}
        item={"team"}
      />
    </>
  );
}
