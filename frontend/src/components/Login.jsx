import React, { useState } from "react";
import Input from "./Input";
import axios from "axios";
import { useNavigate } from "react-router";
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
      const data = await axios.post("http://localhost:3000/login", {
        adminId: adminId,
        name: username,
        email: email,
        mobile: number,
      });

      if (data.status === 201) {
        localStorage.setItem("jwtToken", data.data.token);
        navigate("/");
      }

      console.log(data.data.token);
    } catch (error) {
      console.log(error);
      setErr(error);
    }
  };

  return (
    <>
      <Input
        text="Username"
        type="text"
        onChange={(e) => setUsername(e.currentTarget.value)}
      />
      <Input
        text="Id"
        type="number"
        onChange={(e) => setAdminId(e.currentTarget.value)}
      />
      <Input
        text="Email"
        type="text"
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <Input
        text="Number"
        type="number"
        onChange={(e) => setNumber(e.currentTarget.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </>
  );
}

export default Login;
