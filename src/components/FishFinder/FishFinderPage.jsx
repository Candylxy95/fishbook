import React, { useState, useRef, useEffect } from "react";
import Button from "../Button";
import FishCard from "./FishCard";
import FishFinderList from "./FishFinderList";

const FishFinderPage = () => {
  const [fishesData, setFishesData] = useState([]);
  const [displayFishCards, setDisplayFishCards] = useState([]);
  const [showFishCard, setShowFishCard] = useState(true);
  const fishDataRef = useRef();

  const getFishesData = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/fishes", {
        method: "GET",
        headers: {
          "x-rapidapi-host": "fish-species.p.rapidapi.com",
          "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
        },
      });

      if (!res.ok) {
        throw new Error("no fishy data for you");
      }
      const data = await res.json();

      const fishWithConservationStatus = data.filter(
        (fishData) => fishData.meta && fishData.meta.conservation_status
      ); //grab only fishes with conservation status

      setFishesData(fishWithConservationStatus);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getFishesData();
  }, []);

  const randomIdx = Math.floor(Math.random() * fishesData.length);
  const randomFishQuest = fishesData[randomIdx];

  const handleGo = () => {
    const inputKeyword = fishDataRef.current?.value.toLowerCase();
    const matchingKeyword = fishesData.filter((fishData) =>
      fishData.name.toLowerCase().includes(inputKeyword)
    );
    setDisplayFishCards(matchingKeyword);
    setShowFishCard(false);
    fishDataRef.current.value = "";
  };

  return (
    <>
      <div className="fishFinderPage">
        <div className="fishFinderBar">
          <input
            className="fishFinderInput"
            type="text"
            placeholder="Search fishes..."
            ref={fishDataRef}
          />
          <Button className="fishFinderBtn" func={handleGo}>
            GO
          </Button>
        </div>
        {showFishCard ? (
          <FishCard
            className="fishCard"
            src={
              randomFishQuest?.img_src_set["1.5x"] || "FIND ANOTHER FISH IMG"
            }
            fishName={randomFishQuest?.name}
            rarity={randomFishQuest?.meta.conservation_status || "NO STATUS"}
            msg="Quest of the Day"
          />
        ) : (
          <FishFinderList displayFishCards={displayFishCards} />
        )}
      </div>
    </>
  );
};

export default FishFinderPage;
