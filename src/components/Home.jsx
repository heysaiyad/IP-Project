import Input from "./Input.jsx";
import Button from "./Button";
import { useState } from "react";
import QRCode from "react-qr-code";
function Home() {
  const [qrData, showQrData] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    number: undefined,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle submit");
    console.log(`Name: ${userData.name}`);
    console.log(`Email: ${userData.email}`);
    console.log(`Number: ${userData.number}`);
    showQrData(true);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setUserData({
      name: "",
      email: "",
      number: "",
    });
  };

  const onDataChange = (name) => (e) => {
    setUserData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };
  return (
    <div>
      <Input
        label="name"
        placeholder="Enter name....."
        value={userData.name}
        onChange={onDataChange("name")}
      />
      <Input
        label="email"
        placeholder="Enter Email....."
        value={userData.email}
        onChange={onDataChange("email")}
      />
      <Input
        type="Number"
        label="Mobile Number"
        placeholder="Enter Mobile Number"
        value={userData.number}
        onChange={onDataChange("number")}
      />
      <Button children="Submit" type="submit" onClick={handleSubmit} />
      <Button children="Clear" type="clear" onClick={handleClear} />

      {qrData && (
        <div className="mt-5 ml-5">
          <QRCode value={JSON.stringify(userData)} />
        </div>
      )}
    </div>
  );
}

export default Home;
