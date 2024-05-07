import { Outlet } from "react-router";
import Header from "./components/Header/Header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { login } from "./Store/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const authStatus = localStorage.getItem("authStatus");
    if (authStatus) {
      const auth = JSON.parse(authStatus);
      dispatch(login(auth));
    }
  }, [dispatch]);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
