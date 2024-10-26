import React from "react";
import Button from "../Button";

const UserPokedexCard = (props) => {
  return (
    <div className={props.className}>
      <h5 style={props.style}>{props.status}</h5>
      <div>
        <img src={props.src} />
      </div>
      <div>
        <span>
          Caught: <h5>{props.fishtype}</h5>
        </span>
      </div>
      <div>
        <p>Fight: {props.fightrate}</p>
        <p>Location: {props.location}</p>
      </div>
      <p>{props.msg}</p>
      <div>
        <p>{props.date}</p>
        <p>{props.username}</p>
      </div>
    </div>
  );
};

export default UserPokedexCard;
