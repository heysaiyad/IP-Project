import React, { useState } from "react";
import Input from "./Input";
import link from "./link.json";
import axios from "axios";
import QRCode from "react-qr-code";
import { v4 as uuid } from "uuid";
import { useRef } from "react";
import ReactToPrint from "react-to-print";

function AddBooks() {
  const qrRef = useRef();
  const [bookName, setBookName] = useState("");
  const [bookQuantity, setBookQuantity] = useState(0);
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [qrCodes, setQrCodes] = useState([]);
  const token = localStorage.getItem("jwtToken");

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const bId = [];

      const generatedQrCodes = [];

      for (let i = 0; i < bookQuantity; i++) {
        const uniqueId = uuid();
        generatedQrCodes.push({
          Id: uniqueId,
          Name: bookName,
          Genre: genre,
          Author: author,
        });
        bId.push(uniqueId);
      }
      const data = await axios.post(
        `${link.url}/add-books`,
        {
          bookName: bookName,
          genre: genre,
          author: author,
          quantity: bookQuantity,
          booksId: bId,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(data);
      if (data.status === 201) {
        const res = await axios.get(`${link.url}/${bookName}/book-data`, {
          bookName: bookName,
        });
        console.log(res.data);

        setQrCodes(generatedQrCodes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Input
        text="Book Name: "
        onChange={(e) => {
          e.preventDefault();
          setBookName(e.target.value);
        }}
        value={bookName}
        placeholder="Book Name"
      />
      <Input
        text="Genre: "
        onChange={(e) => {
          e.preventDefault();
          setGenre(e.target.value);
        }}
        value={genre}
        placeholder="Genre"
      />
      <Input
        text="Author: "
        onChange={(e) => {
          e.preventDefault();
          setAuthor(e.target.value);
        }}
        value={author}
        placeholder="Author Name"
      />
      <Input
        text="Quantity: "
        type="number"
        onChange={(e) => {
          e.preventDefault();
          setBookQuantity(e.target.value);
        }}
        value={bookQuantity}
        placeholder="Quantity"
      />
      <button onClick={handleAdd}>Add Book</button>
      <div
        className="flex flex-wrap justify-evenly items-center gap-7 px-10 py-4"
        id="qr"
        ref={qrRef}
      >
        {qrCodes.map((qrData) => (
          <QRCode key={qrData.Id} value={JSON.stringify(qrData)} size={100} />
        ))}
      </div>
      <ReactToPrint
        trigger={() => <button>Print Codes</button>}
        content={() => qrRef.current}
      />
    </>
  );
}

export default AddBooks;
