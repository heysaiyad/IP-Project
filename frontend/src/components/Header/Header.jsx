import { useEffect, useState } from "react";
import LinkBtn from "./LinkBtn";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) setIsLoggedIn(false);
    else setIsLoggedIn(true);
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
  };
  return (
    <>
      <div className="bg-black text-white flex flex-wrap justify-center items-center px-4 py-3 gap-40 text-xl">
        <LinkBtn to="/" text="Home" />
        <LinkBtn to="/add-user" text="Add a new User" />
        <LinkBtn to="/add-books" text="Add Books" />
        <LinkBtn to="/issue-books" text="Issue Book" />
        <LinkBtn to="/scan-code" text="Scan Code" />
        {isLoggedIn ? (
          <LinkBtn to="/login" onClick={handleLogout} text="Logout" />
        ) : (
          <LinkBtn to="/login" text="Login" />
        )}
      </div>
    </>
  );
}

export default Header;
