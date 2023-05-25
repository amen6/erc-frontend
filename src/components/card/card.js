import React from "react";
import { useState } from "react";
import "./card.css";

export default function Card(props) {
  const [isShowing, setIsShowing] = useState(false);
  const [zIndex, setZIndex] = useState(10);

  const handleClick = () => {
    if (isShowing) {
      setIsShowing(false);
      if (zIndex > 10) {
        setZIndex(10);
      }
    } else {
      setIsShowing(true);
      setZIndex(zIndex + 1);
    }
  };
  return (
    <>
      <div className={`card${isShowing ? " show" : ""}`} style={{ zIndex }}>
        <div className="card__image-holder">
          <img
            className="card__image"
            src="https://source.unsplash.com/300x225/?wave"
            alt="wave"
          />
        </div>
        <div className="card-title">
          <a
            href="#"
            className="toggle-info btn"
            onClick={() => {
              handleClick();
              props.handleCardsClick();
            }}
          >
            <span className="left"></span>
            <span className="right"></span>
          </a>
          <h2>
            Card title
            <small>Image from unsplash.com</small>
          </h2>
        </div>
        <div className="card-flap flap1">
          <div className="card-description">
            This grid is an attempt to make something nice that works on touch
            devices. Ignoring hover states when they're not available etc.
          </div>
          <div className="card-flap flap2">
            <div className="card-actions">
              <a href="#" className="btn">
                Read more
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
