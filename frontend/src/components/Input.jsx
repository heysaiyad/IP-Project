import React from "react";

function Input({
  text = "Text",
  type = "text",
  placeholder = "Enter value",
  className = "",
  ...props
}) {
  return (
    <>
      <label>{text}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`${className}`}
        {...props}
      />
    </>
  );
}

export default Input;
