import React from "react";
import Input from "./Input";

const FishCard = (props) => {
  return (
    <div className="fishCard">
      <h1>Quest of the Day</h1>
      <img src={props.src} />
      <h3>{props.fishName}</h3>
      <p>Status: {props.rarity}</p>
    </div>
  );
};

export default FishCard;
