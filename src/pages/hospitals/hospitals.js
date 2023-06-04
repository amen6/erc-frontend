import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../components/card/card";
import Loader from "../../components/loader/loader";
import ConfirmationPopup from "../../components/confirmationPopup/confirmationPopup";
import { useAuthHeader } from "react-auth-kit";
import AddAmbulance from "../../components/addHospital/addHospital";
import { AddCircle } from "@mui/icons-material/";

export default function Hospitals() {
  const [isCardsShowing, setIsCardsShowing] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [DeleteId, setDeleteId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const authHeader = useAuthHeader();
  useEffect(() => {
    setLoading(true);
    document.title = "Hospitals";
    getData();
  }, []);

  const handleCardsClick = () => {
    setIsCardsShowing(!isCardsShowing);
  };

  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_URL}hospital`, {
        headers: { Authorization: authHeader() },
      })
      .then((response) => {
        console.log(response);
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_URL}hospital/${id}`, {
        headers: {
          Authorization: authHeader(),
        },
      })
      .then((response) => {
        console.log(response);
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
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
      {Loading ? (
        <>
          <Loader />
        </>
      ) : (
        <div className={`cards${isCardsShowing ? " showing" : ""}`}>
          <AddCircle className="circular-add" onClick={handleClickOpen} />
          {Data
            ? Data.map((e) => {
                return (
                  <Card
                    key={e._id}
                    _id={e._id}
                    cardtype={"hospital"}
                    name={e.name}
                    image={e.image}
                    hospital_code={e.hospital_code}
                    available={e.available}
                    getData={getData}
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
        getData={getData}
      />
      <ConfirmationPopup
        handleDelete={handleDelete}
        id={DeleteId}
        item={"hospital"}
      />
    </>
  );
}
