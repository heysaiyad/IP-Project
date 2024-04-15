import React from "react";
import { Link } from "react-router-dom";

function LinkBtn({ to = "/", text = "Button", className = "", ...props }) {
  return (
    <>
      <Link to={to} className={`${className}`} {...props}>
        {text}
      </Link>
    </>
  );
}

export default LinkBtn;
