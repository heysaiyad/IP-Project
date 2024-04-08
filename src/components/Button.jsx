import React from "react";

function Button({
  children,
  className = "",
  type = "button",
  bgColor = "bg-black",
  textColor = "text-white",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg mt-10 transition-all hover:bg-blue-600 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
