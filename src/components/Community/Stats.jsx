import React from "react";

const Stats = (props) => {
  return (
    <div className={props.statsDivWrapper}>
      <div className={props.className}>
        <img
          src="../images/trophy.png"
          style={{ width: props.width, height: props.height }}
        />
        <h5>{props.fishcount}</h5>

        <img
          src="../images/quest.png"
          style={{ width: props.width, height: props.height }}
        />
        <h5>{props.questcount}</h5>
      </div>
    </div>
  );
};

export default Stats;
