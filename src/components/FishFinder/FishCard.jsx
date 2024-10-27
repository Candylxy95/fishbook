import React from "react";
import Input from "../Input";
import Button from "../Button";

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
      <div className="fishCardBtns">
        <button className="questOnBtn" onClick={props.questClick}>
          Quest On
        </button>
        <button className="completeBtn" onClick={props.completeClick}>
          Complete
        </button>
      </div>
    </div>
  );
};

export default FishCard;
