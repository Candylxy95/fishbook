import React from "react";

const Button = (props) => {
  return (
    <div>
      <button
        className={props.className}
        style={props.style}
        onClick={props.func}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
