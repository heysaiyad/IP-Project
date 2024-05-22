import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import QrCodeScanner from "./QrCodeScanner";

function ScanCode() {
  const [scanResult, setScanResult] = useState(null);
  const navigate = useNavigate();

  const handleSuccess = (decodedText, decodedResult) => {
    console.log("Scanned data:", decodedText);
    try {
      const userData = JSON.parse(decodedText);
      if (userData && userData.name) {
        setScanResult(userData);
        navigate(`/${userData._id}/userInfo`, {
          id: userData._id,
        });
      } else {
        console.log("Username not found in scanned data.");
      }
    } catch (error) {
      console.error("Error parsing scanned data:", error);
    }
  };
  const handleError = () => {
    console.log("error");
  };

  return (
    <>
      <div id="reader"></div>
      <QrCodeScanner
        height={500}
        id="reader"
        width={500}
        fps={5}
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </>
  );
}
export default ScanCode;
