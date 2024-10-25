import React from "react";

const UserCard = (props) => {
  return (
    <div className={props.className}>
      <h5 style={props.style}>{props.status}</h5>
      <div>
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
