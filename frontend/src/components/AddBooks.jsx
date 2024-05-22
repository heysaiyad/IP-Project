import React, { useState } from "react";
import link from "./link.json";
import axios from "axios";
import QRCode from "react-qr-code";
import { v4 as uuid } from "uuid";
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import { TextField } from "@mui/material";

function AddBooks() {
  const qrRef = useRef();
  const [bookName, setBookName] = useState("");
  const [bookQuantity, setBookQuantity] = useState(null);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Books</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <TextField
            variant="outlined"
            label="Book Name"
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            className="w-full"
          />

          <TextField
            variant="outlined"
            label="Genre"
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full"
          />

          <TextField
            variant="outlined"
            label="Author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full"
          />

          <TextField
            variant="outlined"
            label="Quantity"
            type="number"
            value={bookQuantity}
            onChange={(e) => setBookQuantity(e.target.value)}
            className="w-full"
          />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm"
          >
            Add Book
          </button>
        </form>
      </div>

      <div
        className="flex flex-wrap justify-evenly items-center gap-7 mt-8 px-10 py-4"
        id="qr"
        ref={qrRef}
      >
        {qrCodes.map((qrData) => (
          <QRCode
            key={qrData.Id}
            value={JSON.stringify(qrData)}
            size={100}
            className="border-2 border-gray-500 p-2"
          />
        ))}
      </div>

      {qrCodes.length > 0 && (
        <ReactToPrint
          trigger={() => (
            <button className="mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">
              Print Codes
            </button>
          )}
          content={() => qrRef.current}
        />
      )}
    </div>
  );
}

export default AddBooks;
