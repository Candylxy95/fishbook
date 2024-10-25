import React from "react";

const UserCard = () => {
  return (
    <div className={props.className}>
      <div>
        <h1>{props.msg}</h1>
        <img src={props.src} />
      </div>
      <div>
        <h3>{props.userName}</h3>
        <p>Age: {props.age}</p>
      </div>
    </div>
  );
};

export default UserCard;
