import React, { useState, useRef, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import FishCard from "./FishCard";

const FishFinderPage = () => {
  const [fishesData, setFishesData] = useState([]);
  const fishDataRef = useRef();

  const fishName = fishesData.map((fishData) => fishData.name);

  const fishImg = fishesData.map((fishData) => fishData.img_src_set);

  const fishRarity = fishesData.map(
    (fishData) => fishData.meta.conservation_status
  );

  const randomIdx = Math.floor(Math.random() * fishesData.length);
  const randomFishQuest = fishesData[randomIdx];

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

  return (
    <>
      <div className="fishFinderPage">
        <div className="fishFinderBar">
          <Input className="fishFinderInput" placeholder="Search fishes..." />
          <Button className="fishFinderBtn">GO</Button>
        </div>
        <FishCard
          src={randomFishQuest.img_src_set["1.5x"]}
          fishName={randomFishQuest.name}
          rarity={randomFishQuest.meta.conservation_status}
        />
      </div>
    </>
  );
};

export default FishFinderPage;

// const FishCard = (props) => {
//     return (
//       <div>
//         <img src={props.src} /> //return image src here
//         <h3>{props.fishName}</h3> //return fish name here
//         <p>Status: {props.rarity}</p> //return conservationstatus here
//       </div>
