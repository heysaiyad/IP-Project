import React from "react";

function Button({
  text = "Add User",
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-700 ${className}`}
      {...props}
    >
      {text}
    </button>
  );
}

export default Button;