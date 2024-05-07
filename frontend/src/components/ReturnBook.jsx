import React, { useState } from "react";
import QrCodeScanner from "./QrCodeScanner";
import link from "./link.json";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

function ReturnBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [err, setErr] = useState("");
  const handleSuccess = async (decodedText, decodedResult) => {
    const token = localStorage.getItem("jwtToken");
    try {
      setErr("");
      const returnBook = JSON.parse(decodedText);
      if (returnBook) {
        console.log(returnBook);
        const response = await axios.post(
          `${link.url}/return-book`,
          {
            bookName: returnBook.Name,
            id: id,
            bId: returnBook.Id,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        console.log(response);
        if (response.status === 200) navigate(`/${id}/userInfo`);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 404)
        return setErr(`Book with this Id/Name not issued`);
      setErr(error.message);
    }
  };
  const handleError = () => {};
  return (
    <>
      <div>ReturnBook</div>
      {err && <h3 className="text-red-700 text-2xl">{err}</h3>}
      <div id="reader"></div>
      <QrCodeScanner
        height={500}
        width={500}
        fps={5}
        id={"reader"}
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </>
  );
}

export default ReturnBook;
