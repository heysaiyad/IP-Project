import React, { useState } from "react";
import Input from "./Input";
import axios from "axios";
import { useNavigate } from "react-router";
import link from "./link.json";
import { useDispatch } from "react-redux";
import { login } from "../Store/authSlice";
import { TextField } from "@mui/material";
function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [adminId, setAdminId] = useState(null);
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState(null);
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(`${link.url}/login`, {
        adminId: adminId,
        name: username,
        email: email,
        mobile: number,
      });

      if (data.status === 201) {
        localStorage.setItem("jwtToken", data.data.token);
        localStorage.setItem("adminId", adminId);
        dispatch(login());
        navigate("/");
      }

      console.log(data.data.token);
    } catch (error) {
      console.log(error);
      setErr(error.response?.data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      {err && <h2 className="text-red-700 text-2xl">{err}</h2>}
      <div className="px-14 py-8 mt-6 w-fit rounded-xl shadow-xl bg-white flex items-center justify-center flex-col">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <br />
        <form
          onSubmit={handleLogin}
          className="space-y-4 flex items-center justify-center flex-col"
        >
          <TextField
            variant="outlined"
            label="Username"
            type="text"
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
          <TextField
            variant="outlined"
            label="Admin Id"
            type="number"
            onChange={(e) => setAdminId(e.currentTarget.value)}
          />
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <TextField
            variant="outlined"
            label="Mobile Number"
            type="number"
            onChange={(e) => setNumber(e.currentTarget.value)}
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
