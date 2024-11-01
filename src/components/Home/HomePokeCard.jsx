import React from "react";
import Stats from "../Community/Stats";

const HomePokeCard = (props) => {
  return (
    <>
      <div className={props.pokedexCardContainer} onClick={props.func}>
        <div>
          <img
            src={props.img || "/images/fishbook-logo"}
            className={props.imgClassName}
          />
        </div>
        <div className={props.className}>
          <div>
            <span>
              Caught:{" "}
              <h5 style={{ fontFamily: "var(--stac)", fontWeight: "600" }}>
                {props.fishtype}{" "}
              </h5>
              <div
                style={{
                  fontSize: "14px",
                  marginTop: "-10px",
                  fontStyle: "italic",
                }}
              >
                {props.fishstatus}
              </div>
            </span>
          </div>
        </div>
        <div style={{ paddingLeft: "10px" }}>
          <Stats
            statsDivWrapper={props.statsDivWrapper}
            className={props.homeStats}
            fishcount={props.fishcount}
            questcount={props.questcount}
            width={props.width}
            height={props.height}
            fontSize={props.fontSize}
          />
          <p style={{ fontSize: "14px" }}>
            Fight: <b>{props.fightrate}</b>
          </p>
          <p style={{ marginTop: "-15px", fontSize: "14px" }}>
            Location: <b>{props.location}</b>
          </p>
        </div>
        <p style={{ paddingLeft: "10px", color: "#5C5C5C" }}>{props.msg}</p>
        <div style={{ marginTop: "-10px" }}>
          <div
            style={{
              paddingLeft: "10px",
              fontSize: "14px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p style={{ paddingBottom: "10px" }}>{props.username}</p>
            {props.status}
          </div>
          <p
            style={{
              paddingLeft: "10px",
              color: "#5C5C5C",
              fontSize: "12px",
              marginTop: "-30px",
            }}
          >
            {props.date}
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePokeCard;
