import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AmbulanceCard from "../../components/ambulanceCard/card";
import Loader from "../../components/loader/loader";

export default function Ambulances() {
  const [isCardsShowing, setIsCardsShowing] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);

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
      .get(`${process.env.REACT_APP_URL}ambulance`)
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
                  <AmbulanceCard
                    key={e._id}
                    id={e._id}
                    name={e.name}
                    image={e.image}
                    fuelType={e.fuel_type}
                    fuelPercentage={e.fuel_percentage}
                    outOfService={e.out_of_service}
                    handleCardsClick={handleCardsClick}
                  />
                );
              })
            : null}
        </div>
      )}
    </>
  );
}
