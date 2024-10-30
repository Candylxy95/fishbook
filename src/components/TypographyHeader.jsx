import React from "react";
import { TypeAnimation } from "react-type-animation";

const TypographyHeader = (props) => {
  return (
    <TypeAnimation
      sequence={props.headerMsg}
      wrapper="span"
      speed={props.speed}
      style={props.fontstyle}
      repeat={0}
      cursor={false}
    />
  );
};

export default TypographyHeader;
