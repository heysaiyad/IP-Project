import axios from "axios";
import Button from "./Button";
import Input from "./Input";
import React, { useState } from "react";
import link from "./link.json";
import QRCode from "react-qr-code";

function AddUser() {
  const token = localStorage.getItem("jwtToken");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [err, setErr] = useState("");
  const [qrData, setQrData] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log(`${name} :: ${email} :: ${number}`);
    const makeUser = async () => {
      try {
        if (!token) return setErr("Login to perform this action");
        else {
          setErr("");
          const response = await axios.post(
            `${link.url}/add-user`,
            {
              name: name,
              email: email,
              mobile: number,
            },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            },
          );
          console.log(response);
          if (response.status === 201) {
            const qr = await axios.get(`${link.url}/qr-data`, {
              params: { email: email },
            });
            setQrData(qr.data);
          }
        }
      } catch (error) {
        console.log(error);
        setErr(error.message);
      }
    };
    makeUser();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="p-6 mt-6 text-left border w-96 rounded-xl shadow-xl bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Add User</h2>
        {err && <div className="text-red-600 font-2xl mb-4">{err}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            text="Name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border w-full p-2 rounded-md"
          />
          <Input
            text="Email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border w-full p-2 rounded-md"
          />
          <Input
            text="Number"
            placeholder="Enter Mobile Number"
            type="Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="border w-full p-2 rounded-md"
          />
          <Button type="Submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm" />
        </form>
      </div>
    </div>
  
  );
}

export default AddUser;
