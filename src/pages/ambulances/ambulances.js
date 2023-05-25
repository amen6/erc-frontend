import React from "react";
import { useState } from "react";
import Card from "../../components/card/card";

export default function Ambulances() {
  const [isCardsShowing, setIsCardsShowing] = useState(false);

  const handleCardsClick = () => {
    setIsCardsShowing(!isCardsShowing);
  };
  return (
    <div className={`cards${isCardsShowing ? " showing" : ""}`}>
      <Card title="Ambulances" handleCardsClick={handleCardsClick} />
    </div>
  );
}
