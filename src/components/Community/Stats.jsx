import React from "react";

const Stats = (props) => {
  return (
    <div className={props.className}>
      <img src="../images/trophy.png" />
      <h5>{props.fishcount}</h5>

      <img src="../images/quest.png" />
      <h5>{props.questcount}</h5>
    </div>
  );
};

export default Stats;
