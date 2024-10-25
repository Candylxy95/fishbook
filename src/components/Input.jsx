import React from "react";

const Input = (props) => {
  return (
    <>
      <input
        className={props.className}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        type={props.type}
        style={props.style}
      ></input>
    </>
  );
};

export default Input;
