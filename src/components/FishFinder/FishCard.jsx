import React from "react";
import Input from "../Input";

const FishCard = (props) => {
  return (
    <div className={props.className}>
      <div>
        <h1>{props.msg}</h1>
        <img src={props.src} />
      </div>
      <div>
        <h3>{props.fishName}</h3>
        <p>Status: {props.rarity}</p>
      </div>
    </div>
  );
};

export default FishCard;
