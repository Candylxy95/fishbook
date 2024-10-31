import React from "react";

const FishCard = (props) => {
  return (
    <div className={props.className}>
      <div>
        <h1>{props.msg}</h1>

        <img src={props.src} className={props.imgClass} />
      </div>
      <div>
        <h3>{props.fishName}</h3>
        <p>Status: {props.rarity}</p>
      </div>
      <div className={props.fishCardBtns}>
        <button className="questOnBtn" onClick={props.questClick}>
          Quest On
        </button>
        <button className="completeBtn" onClick={props.completeClick}>
          Complete
        </button>
      </div>
    </div>
  );
};

export default FishCard;
