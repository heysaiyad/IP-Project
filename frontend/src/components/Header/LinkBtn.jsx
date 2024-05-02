import React from "react";
import { Link } from "react-router-dom";

function LinkBtn({ to = "/", text = "Button", className = "", ...props }) {
  return (
    <Link 
      to={to} 
      className={`px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-700 ${className}`} 
      {...props}
    >
      {text}
    </Link>
  );
}

export default LinkBtn;