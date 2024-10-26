import React from "react";
import Button from "../Button";

const UserCard = (props) => {
  return (
    <div className={props.className}>
      <h5 style={props.style}>{props.status}</h5>
      <div className="userCardImg">
        <img src={props.src} />
      </div>
      <div>
        <h5>
          {props.userName}, {props.age}
        </h5>
        <p>{props.location}</p>
        <p>{props.msg}</p>
      </div>
      <Button func={props.func}>Check Out</Button>
    </div>
  );
};

export default UserCard;
