import React, { useState } from "react";
import Input from "./Input";
import link from "./link.json";
import axios from "axios";
import QRCode from "react-qr-code";

function AddBooks() {
  const [bookName, setBookName] = useState("");
  const [bookQuantity, setBookQuantity] = useState(0);
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [qrData, setQrData] = useState(null);
  const token = localStorage.getItem("jwtToken");
  console.log(token);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        `${link.url}/add-books`,
        {
          bookName: bookName,
          genre: genre,
          author: author,
          quantity: bookQuantity,
        },

        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(data);
      if (data.status === 201) {
        const res = await axios.get(`${link.url}/${bookName}/book-data`, {
          bookName: bookName,
        });
        console.log(res.data);
        setQrData(res.data);
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
      {qrData && (
        <div className="m-5">
          <QRCode value={JSON.stringify(qrData)} />
        </div>
      )}
    </>
  );
}

export default AddBooks;
