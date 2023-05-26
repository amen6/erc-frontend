import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../components/card/card";

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
      .get("http://127.0.0.1:3000/ambulance")
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
    <div className={`cards${isCardsShowing ? " showing" : ""}`}>
      {Data
        ? Data.map((e) => {
            return (
              <Card
                key={e._id}
                id={e._id}
                name={e.name}
                image={e.image}
                handleCardsClick={handleCardsClick}
              />
            );
          })
        : null}
    </div>
  );
}
