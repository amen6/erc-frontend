import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../components/card/card";
import Loader from "../../components/loader/loader";
import ConfirmationPopup from "../../components/confirmationPopup/confirmationPopup";
import { useAuthHeader } from "react-auth-kit";

export default function Ambulances() {
  const [isCardsShowing, setIsCardsShowing] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [DeleteId, setDeleteId] = useState("");
  const authHeader = useAuthHeader();
  useEffect(() => {
    setLoading(true);
    document.title = "Ambulances";
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
    document.querySelector(".confirmation-popup").showModal(1);
  };

  return (
    <>
      {Loading ? (
        <>
          <Loader />
        </>
      ) : (
        <div className={`cards${isCardsShowing ? " showing" : ""}`}>
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
      <ConfirmationPopup
        handleDelete={handleDelete}
        id={DeleteId}
        item={"hospital"}
      />
    </>
  );
}
