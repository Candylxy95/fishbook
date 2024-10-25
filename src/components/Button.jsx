import React from "react";

const Button = (props) => {
  return (
    <div>
      <button className={props.className} style={props.style}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
