import React from "react";

function Button({
  text = "Button",
  type = "Submit",
  className = "",
  ...props
}) {
  return (
    <>
      <button
        type={type}
        className={`border-2 border-black px-4 py-2 ${className}`}
        {...props}
      >
        {text}
      </button>
    </>
  );
}

export default Button;
