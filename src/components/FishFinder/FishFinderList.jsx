import React from "react";
import FishCard from "./FishCard";

const FishFinderList = (props) => {
  return (
    <div className="fishCardsDisplay">
      {Array.isArray(props.displayFishCards) &&
      props.displayFishCards.length > 0 ? (
        props.displayFishCards.map((displayFishCard, idx) => {
          return (
            <FishCard
              key={idx}
              id={idx}
              className="fishCardDisplay"
              src={
                displayFishCard?.img_src_set["1.5x"] || "FIND ANOTHER FISH IMG"
              }
              fishName={displayFishCard?.name}
              rarity={displayFishCard?.meta.conservation_status || "NO STATUS"}
            />
          );
        })
      ) : (
        <p className="text-center">No fishy found</p>
      )}
    </div>
  );
};

export default FishFinderList;
