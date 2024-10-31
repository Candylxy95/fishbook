import React, { useState, useRef, useEffect } from "react";
import FishCard from "./FishCard";
import FishFinderList from "./FishFinderList";
import QuestModal from "../QuestModal";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

const FishFinderPage = () => {
  const [showQuestModal, setShowQuestModal] = useState(false);
  const [selectedFish, setSelectedFish] = useState(""); //log fishtype name here
  const [fishesData, setFishesData] = useState([]);
  const [displayFishCards, setDisplayFishCards] = useState([]);
  const [showFishQuestCard, setShowFishQuestCard] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const fishDataRef = useRef();
  const navigate = useNavigate();

  const getFishesData = async (signal) => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/fishes", {
        method: "GET",
        headers: {
          "x-rapidapi-host": "fish-species.p.rapidapi.com",
          "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
        },
        signal,
      });

      if (!res.ok) {
        throw new Error("no fishy data for you");
      }
      const data = await res.json();
      // const fishWithConservationStatus = data.filter(
      //   (fishData) => fishData.meta && fishData.meta.conservation_status
      // ); //grab only fishes with conservation status

      setFishesData(data);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error.message);
      }
    }
  };

  const randomIdx = Math.floor(Math.random() * fishesData.length);
  const randomFishQuest = fishesData.length > 0 ? fishesData[randomIdx] : null;

  const handleGo = () => {
    const inputKeyword = fishDataRef.current?.value.toLowerCase();
    const matchingKeyword = fishesData.filter((fishData) =>
      fishData.name.toLowerCase().includes(inputKeyword)
    );
    setDisplayFishCards(matchingKeyword);
    setShowFishQuestCard(false);
    fishDataRef.current.value = "";
  };

  const handleQuestClick = (fishType) => {
    setSelectedFish(fishType);
    setShowQuestModal(true);
  };

  const handleCompleteClick = (fishType) => {
    setSelectedFish(fishType);
    navigate("/createpost", { state: { defaultValue: fishType } });
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getFishesData(signal);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      controller.abort();
    };
  }, []);

  return !isLoading ? (
    <>
      {showQuestModal && (
        <QuestModal
          fishtype={selectedFish}
          setShowQuestModal={setShowQuestModal}
        />
      )}
      <div className="fishFinderPage">
        <div className="fishFinderBar">
          <input
            className="fishFinderInput"
            type="text"
            placeholder="Search fishes..."
            ref={fishDataRef}
          />
          <button className="fishFinderBtn" onClick={handleGo}>
            GO
          </button>
        </div>
        {showFishQuestCard ? (
          <FishCard
            className="fishCard"
            src={
              randomFishQuest?.img_src_set["1.5x"] ||
              "./images/fishimgplaceholder.png"
            }
            fishName={randomFishQuest?.name}
            rarity={
              randomFishQuest?.meta.conservation_status?.includes(
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
              ) : randomFishQuest?.meta.conservation_status?.includes(
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
              ) : randomFishQuest?.meta.conservation_status?.includes(
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
              ) : randomFishQuest?.meta.conservation_status?.includes(
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
              ) : randomFishQuest?.meta.conservation_status?.includes(
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
              ) : randomFishQuest?.meta.conservation_status?.includes(
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
            msg="Quest of the Moment"
            questClick={() => handleQuestClick(randomFishQuest?.name)}
            completeClick={() => handleCompleteClick(randomFishQuest?.name)}
          />
        ) : (
          <FishFinderList displayFishCards={displayFishCards} />
        )}
      </div>
    </>
  ) : (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <LoadingSpinner />
    </div>
  );
};

export default FishFinderPage;
