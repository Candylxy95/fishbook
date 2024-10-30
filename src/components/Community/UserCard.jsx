import React from "react";

const UserCard = (props) => {
  return (
    <div className={props.className} onClick={props.func}>
      <div>
        <p>{props.status}</p>
      </div>
      <div className={props.userCardImg}>
        <img src={props.src} className={props.actualImg} />
      </div>
      <div className={props.statsClass}>
        <p className={props.userStatusClass}>{props.userStatus}</p>
        <div className={props.statsClassChild}>
          <img
            src={props.trophyimg}
            style={{ width: props.width, height: props.height }}
          />
          <p style={{ fontSize: props.fontSize }}>{props.fishcount}</p>

          <img
            src={props.questimg}
            style={{ width: props.width, height: props.height }}
          />
          <p style={{ fontSize: props.fontSize }}>{props.questcount}</p>
        </div>
      </div>
      <div>
        <div className={props.userlocationDiv}>
          <h5>
            {props.userName}, {props.age}
          </h5>
          <p>{props.location}</p>
        </div>
        <p className={props.msgstyle}>{props.msg}</p>
      </div>
    </div>
  );
};

export default UserCard;
