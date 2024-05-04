import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function ScanCode() {
  const [scanResult, setScanResult] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: { width: 500, height: 500 },
      fps: 5,
    });

    const successCallback = (decodedText, decodedResult) => {
      console.log("Scanned data:", decodedText);
      try {
        const userData = JSON.parse(decodedText);
        if (userData && userData.name) {
          setScanResult(userData);
          navigate(`/${userData._id}/userInfo`, {
            id: userData._id,
          });
          setSuccess(!success);
        } else {
          console.log("Username not found in scanned data.");
        }
      } catch (error) {
        console.error("Error parsing scanned data:", error);
      }
    };

    const errorCallback = (error) => {
      console.log(error);
    };

    const readerElement = document.getElementById("reader");
    if (readerElement) {
      scanner.render(successCallback, errorCallback);
    } else {
      console.error("HTML Element with id=reader not found");
    }
    return () => {
      scanner.clear();
    };
  }, []);
  {
    /*
  useEffect(() => {
    console.log("Navigating");
    navigate(`/${scanResult.email}/userInfo`);
  }, [success]);
*/
  }
  return (
    <div>
      <h1>Scan Code</h1>
      <div id="reader"></div>
      {scanResult && <div>Success: {scanResult.name}</div>}
    </div>
  );
}

export default ScanCode;
