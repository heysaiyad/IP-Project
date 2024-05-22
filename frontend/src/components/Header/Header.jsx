import { useEffect, useState } from "react";
import LinkBtn from "./LinkBtn";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/authSlice";
function Header() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("jwtToken");
  const authStatus = useSelector((state) => state.auth);
  useEffect(() => {
    if (!token) setIsLoggedIn(false);
    else setIsLoggedIn(true);
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
    dispatch(logout());
  };
  return (
    <div className="bg-blue-500 text-white flex flex-wrap justify-center items-center px-4 py-3 gap-32 text-xl shadow-md">
      <LinkBtn
        to={token ? "/" : "/login"}
        text="Home"
        className="hover:text-yellow-300"
      />
      <LinkBtn
        to={token ? "/all-books" : "/login"}
        text="All Books"
        className="hover:text-yellow-300"
      />
      <LinkBtn
        to={token ? "/add-books" : "/login"}
        text="Add Books"
        className="hover:text-yellow-300"
      />
      <LinkBtn
        to={token ? "/issued-books" : "/login"}
        text="Issued Books"
        className="hover:text-yellow-300"
      />
      {authStatus.auth ? (
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
