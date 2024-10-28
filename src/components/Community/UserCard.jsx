import React from "react";
import Button from "../Button";

const UserCard = (props) => {
  return (
    <div className={props.className} onClick={props.func}>
      <div>
        <h6>{props.status}</h6>
      </div>
      <div className={props.userCardImg}>
        <img src={props.src} className={props.actualImg} />
      </div>
      <h5 className={props.userStatusClass}>{props.userStatus}</h5>
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
