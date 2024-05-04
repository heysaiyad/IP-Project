import React, { useState } from "react";
import Input from "./Input";
import axios from "axios";
import { useNavigate } from "react-router";
import link from "./link.json";
function Login() {
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
        navigate("/");
      }

      console.log(data.data.token);
    } catch (error) {
      console.log(error);
      setErr(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="p-6 mt-6 text-left border w-96 rounded-xl shadow-xl bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            text="Username"
            type="text"
            onChange={(e) => setUsername(e.currentTarget.value)}
            className="border w-full p-2 rounded-md"
          />
          <Input
            text="Id"
            type="number"
            onChange={(e) => setAdminId(e.currentTarget.value)}
            className="border w-full p-2 rounded-md"
          />
          <Input
            text="Email"
            type="text"
            onChange={(e) => setEmail(e.currentTarget.value)}
            className="border w-full p-2 rounded-md"
          />
          <Input
            text="Number"
            type="number"
            onChange={(e) => setNumber(e.currentTarget.value)}
            className="border w-full p-2 rounded-md"
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
