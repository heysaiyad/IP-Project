import axios from "axios";
import React, { useEffect, useState } from "react";
import link from "./link.json";

function IssuedBooks() {
  const [books, setBooks] = useState([]);
  const [err, setErr] = useState("");
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (!token) return setErr("Login To Continue");
    const issued = async () => {
      try {
        const response = await axios.get(`${link.url}/issued-books`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data.issuedBooks);
        setBooks(response.data.issuedBooks);
      } catch (error) {
        setErr("Failed to fetch issued books");
      }
    };
    issued();
  }, [token]);

  if (err) {
    return <div className="text-red-500">{err}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Book Name</th>
              <th className="py-2 px-4 border-b">Issued To</th>
              <th className="py-2 px-4 border-b">Book ID</th>
            </tr>
          </thead>
          <tbody>
            {books &&
              books.map((book) => (
                <tr key={book._id} className="hover:bg-gray-100 text-center">
                  <td className="py-2 px-4 border-b">{book.bookName}</td>
                  <td className="py-2 px-4 border-b">{book.issuedTo}</td>
                  <td className="py-2 px-4 border-b">{book.bookId}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IssuedBooks;
