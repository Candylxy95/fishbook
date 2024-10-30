import React from "react";
import { TypeAnimation } from "react-type-animation";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "30vh",
      }}
    >
      <TypeAnimation
        sequence={["No fishes here, head back.", 1000]}
        wrapper="span"
        speed={10}
        style={{
          fontSize: "3em",
          display: "inline-block",
          fontFamily: "var(--staac)",
          fontWeight: "bolder",
        }}
        repeat={0}
        cursor={false}
      />
    </div>
  );
};

export default NotFound;
