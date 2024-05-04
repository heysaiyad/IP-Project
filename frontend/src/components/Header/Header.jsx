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
    <div className="bg-blue-500 text-white flex flex-wrap justify-center items-center px-4 py-3 gap-32 text-xl shadow-md">
      <LinkBtn to="/" text="Home" className="hover:text-yellow-300" />
      <LinkBtn
        to="/add-user"
        text="Add a new User"
        className="hover:text-yellow-300"
      />
      <LinkBtn
        to="/add-books"
        text="Add Books"
        className="hover:text-yellow-300"
      />
      <LinkBtn
        to="/scan-code"
        text="Scan Code"
        className="hover:text-yellow-300"
      />
      {isLoggedIn ? (
        <LinkBtn
          to="/login"
          onClick={handleLogout}
          text="Logout"
          className="hover:text-yellow-300"
        />
      ) : (
        <LinkBtn to="/login" text="Login" className="hover:text-yellow-300" />
      )}
    </div>
  );
}

export default Header;
