import React from "react";
import Button from "../Button";

const UserCard = (props) => {
  return (
    <div className={props.className} onClick={props.func}>
      <div>
        <h5>{props.status}</h5>
      </div>
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
    </div>
  );
};

export default UserCard;
