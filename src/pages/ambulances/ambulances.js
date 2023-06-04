import React from "react";
import { useState, useEffect } from "react";
import { useAuthHeader } from "react-auth-kit";
import AmbulanceCard from "../../components/ambulanceCard/card";
import Loader from "../../components/loader/loader";
import useFetch from "../../components/customFetch/customFetch";

export default function Ambulances() {
  const [isCardsShowing, setIsCardsShowing] = useState(false);
  const authHeader = useAuthHeader();
  const { data, isLoading, error, reFetch } = useFetch(
    "ambulance",
    authHeader()
  );

  useEffect(() => {
    document.title = "Ambulances";
    reFetch();
  }, []);

  const handleCardsClick = () => {
    setIsCardsShowing(!isCardsShowing);
  };

  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <div className={`cards${isCardsShowing ? " showing" : ""}`}>
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
