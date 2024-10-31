import React, { useState } from "react";
import FishCard from "./FishCard";
import QuestModal from "../QuestModal";
import { useNavigate } from "react-router-dom";

const FishFinderList = (props) => {
  const navigate = useNavigate();
  const [showQuestModal, setShowQuestModal] = useState(false);
  const [selectedFish, setSelectedFish] = useState(""); //log fishtype name here

  const handleQuestClick = (fishType) => {
    setSelectedFish(fishType);
    setShowQuestModal(true);
  };

  const handleCompleteClick = (fishType) => {
    setSelectedFish(fishType);
    navigate("/createpost", { state: { defaultValue: fishType } });
  };

  return (
    <>
      {showQuestModal && (
        <QuestModal
          fishtype={selectedFish}
          setShowQuestModal={setShowQuestModal}
        />
      )}
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
                  displayFishCard?.img_src_set["1.5x"] ||
                  "./images/fishimgplaceholder.png"
                }
                fishName={displayFishCard?.name}
                rarity={
                  displayFishCard?.meta.conservation_status?.includes(
                    "Least Concern"
                  ) ? (
                    <span
                      style={{
                        fontWeight: "bolder",
                        color: "#2B9EB3",
                        fontSize: "20px",
                      }}
                    >
                      Abundant
                    </span>
                  ) : displayFishCard?.meta.conservation_status?.includes(
                      "secure"
                    ) ? (
                    <span
                      style={{
                        fontWeight: "bolder",
                        color: "#78C247",
                        fontSize: "20px",
                      }}
                    >
                      Common
                    </span>
                  ) : displayFishCard?.meta.conservation_status?.includes(
                      "Near Threatened"
                    ) ? (
                    <span
                      style={{
                        fontWeight: "bolder",
                        color: "#CFD11A",
                        fontSize: "20px",
                      }}
                    >
                      Uncommon
                    </span>
                  ) : displayFishCard?.meta.conservation_status?.includes(
                      "Vulnerable"
                    ) ? (
                    <span
                      style={{
                        fontWeight: "bolder",
                        color: "#D9594C",
                        fontSize: "20px",
                      }}
                    >
                      Rare
                    </span>
                  ) : displayFishCard?.meta.conservation_status?.includes(
                      "Endangered"
                    ) ? (
                    <span
                      style={{
                        fontWeight: "bolder",
                        color: "#F84AA7",
                        fontSize: "20px",
                      }}
                    >
                      Very Rare
                    </span>
                  ) : displayFishCard?.meta.conservation_status?.includes(
                      "Critically Endangered"
                    ) ? (
                    <span
                      style={{
                        fontWeight: "bolder",
                        color: "#FFC60A",
                        fontSize: "20px",
                      }}
                    >
                      Extremely Rare
                    </span>
                  ) : (
                    <span
                      style={{
                        fontWeight: "bolder",
                        color: "#753742",
                        fontSize: "20px",
                      }}
                    >
                      Mysterious
                    </span>
                  )
                }
                questClick={() => handleQuestClick(displayFishCard.name)}
                completeClick={() => handleCompleteClick(displayFishCard.name)}
              />
            );
          })
        ) : (
          <p className="text-center">No fishy found</p>
        )}
      </div>
    </>
  );
};

export default FishFinderList;
