import React, { useEffect, useState } from "react";
import link from "./link.json";
import axios from "axios";
import { useNavigate } from "react-router";
function Home() {
  const [adminData, setAdminData] = useState({});
  const [err, setErr] = useState("");
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const details = async () => {
        if (!token) setErr("Login to Continue");
        else {
          const adminId = localStorage.getItem("adminId");
          setErr("");
          const data = await axios.get(`${link.url}/${adminId}/admin-info`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(data);
          setAdminData(data.data);
        }
      };
      details();
    } catch (error) {
      setErr(error.message);
    }
  }, [token]);

  const handleScanCode = (e) => {
    e.preventDefault();
    console.log("Scanning Qr Code");
    navigate("/scan-code");
  };
  return (
    <>
      {err && <h1 className="text-red-500 text0-2xl">{err}</h1>}
      <div className="flex flex-row justify-evenly">
        {" "}
        {adminData && (
          <div>
            <h1>Name: {adminData.name}</h1>
            <h1>Email: {adminData.email}</h1>
            <h1>Mobile: {adminData.mobile}</h1>
            <h1>Address: {adminData.address}</h1>
          </div>
        )}
        <div>
          <button
            className="border-2 border-black px-6 py-3"
            onClick={handleScanCode}
          >
            Scan Code
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
