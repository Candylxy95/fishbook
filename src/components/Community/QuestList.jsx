import React from "react";

const QuestList = (props) => {
  return (
    <div className={props.className}>
      <h5>Quest List</h5>
      <p>{props.fishtype}</p>
    </div>
  );
};

export default QuestList;
