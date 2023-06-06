import React from "react";
import { FaUserCircle } from "react-icons/fa";
import "./rectangleCard.css";

export default function rectangleCard(props) {
  return (
    <div className="rectangle-card">
      <FaUserCircle />
      <div className="info-container">
        <h4>{props.title}</h4>
        <h2>
          {props.number} {props.unit}
        </h2>
      </div>
    </div>
  );
}
