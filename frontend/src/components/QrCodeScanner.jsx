import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useEffect } from "react";

function QrCodeScanner({ height, width, fps, id, onSuccess, onError }) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(id, {
      qrbox: { width: width, height: height },
      fps: fps,
    });
    const readerElement = document.getElementById(id);
    if (readerElement) scanner.render(onSuccess, onError);
    else console.log(`HTML element with id=${id} not found`);

    return () => {
      scanner.clear();
    };
  }, [height, width, fps, id, onSuccess, onError]);

  return <div id={id}></div>;
}

export default QrCodeScanner;
