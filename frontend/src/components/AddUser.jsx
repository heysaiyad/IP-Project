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
    <>
      <div>AddUser</div>
      {err && <div className="text-red-600 font-2xl">{err}</div>}
      <form onSubmit={handleSubmit}>
        <Input
          text="Name"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          text="Email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          text="Number"
          placeholder="Enter Mobile Number"
          type="Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <Button type="Submit" />
      </form>
      {qrData && (
        <div className="ml-5">
          <QRCode value={JSON.stringify(qrData)} />
        </div>
      )}
    </>
  );
}

export default AddUser;
