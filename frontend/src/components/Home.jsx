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
    const fetchData = async () => {
      if (!token) {
        setErr("Login to Continue");
      } else {
        try {
          const adminId = localStorage.getItem("adminId");
          setErr("");
          const { data } = await axios.get(
            `${link.url}/${adminId}/admin-info`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          setAdminData(data);
        } catch (error) {
          setErr(error.message);
        }
      }
    };
    fetchData();
  }, [token]);

  const handleScanCode = (e) => {
    e.preventDefault();
    navigate("/scan-code");
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    navigate("/add-user");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      {err && <h1 className="text-red-500 text-2xl mb-4">{err}</h1>}
      {Object.keys(adminData).length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 max-w-lg">
          <h1 className="text-2xl font-bold mb-2">Name: {adminData.name}</h1>
          <h1 className="text-xl mb-2">Email: {adminData.email}</h1>
          <h1 className="text-xl mb-2">Mobile: {adminData.mobile}</h1>
          <h1 className="text-xl">Address: {adminData.address}</h1>
        </div>
      )}
      <div className="flex justify-center space-x-4">
        <button
          className="border-2 border-black px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
          onClick={handleScanCode}
        >
          Scan Code
        </button>
        <button
          className="border-2 border-black px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
          onClick={handleAddUser}
        >
          Add User
        </button>
      </div>
    </div>
  );
}

export default Home;
