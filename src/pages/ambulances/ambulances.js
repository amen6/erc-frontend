import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";
import AmbulanceCard from "../../components/ambulanceCard/card";
import Loader from "../../components/loader/loader";
import useFetch from "../../components/customFetch/customFetch";
import ConfirmationPopup from "../../components/confirmationPopup/confirmationPopup";
import AddAmbulance from "../../components/addAmbulance/addAmbulance";
import { AddCircle } from "@mui/icons-material/";

export default function Ambulances() {
  const [isCardsShowing, setIsCardsShowing] = useState(false);
  const [DeleteId, setDeleteId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const authHeader = useAuthHeader();
  const { data, isLoading, error, reFetch } = useFetch(
    "ambulance",
    authHeader()
  );

  useEffect(() => {
    document.title = "Ambulances";
    reFetch();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_URL}ambulance/${id}`, {
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

  const handleCardsClick = () => {
    setIsCardsShowing(!isCardsShowing);
  };

  const showConfirmationBox = (deleteid) => {
    setDeleteId(deleteid);
    document.querySelector(".confirmation-popup").showModal();
  };

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <div className={`cards${isCardsShowing ? " showing" : ""}`}>
          <AddCircle className="circular-add" onClick={handleClickOpen} />
          {data.data
            ? data.data.map((e) => {
                return (
                  <AmbulanceCard
                    key={e._id}
                    _id={e._id}
                    name={e.name}
                    image={e.image}
                    fuelType={e.fuel_type}
                    fuelPercentage={e.fuel_percentage}
                    outOfService={e.out_of_service}
                    reFetch={reFetch}
                    authHeader={authHeader}
                    showConfirmationBox={showConfirmationBox}
                    handleCardsClick={handleCardsClick}
                  />
                );
              })
            : null}
        </div>
      )}
      <AddAmbulance
        handleClose={handleClose}
        open={dialogOpen}
        reFetch={reFetch}
      />
      <ConfirmationPopup
        handleDelete={handleDelete}
        id={DeleteId}
        item={"hospital"}
      />
    </>
  );
}
