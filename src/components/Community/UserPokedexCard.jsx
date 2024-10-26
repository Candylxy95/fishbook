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
        <p>{props.location}</p>
        <p>{props.msg}</p>
      </div>
      <Button func={props.func}>Profile</Button>
    </div>
  );
};

export default UserPokedexCard;
