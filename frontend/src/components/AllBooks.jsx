import React, { useEffect, useState } from "react";
import link from "./link.json";
import axios from "axios";

function AllBooks() {
  const [books, setBooks] = useState([]);
  const [err, setErr] = useState("");

  const token = localStorage.getItem("jwtToken");
  useEffect(() => {
    if (!token) return setErr("Login To Continue");
    const allBooks = async () => {
      try {
        const response = await axios.get(`${link.url}/allBooks-details`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data.books);
        setBooks(response.data.books);
      } catch (error) {
        setErr("Failed to fetch books");
      }
    };
    allBooks();
  }, [token]);

  if (err) {
    return <div className="text-red-500">{err}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-2 border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Book Name</th>
              <th className="py-2 px-4 border-b">Genre</th>
              <th className="py-2 px-4 border-b">Author</th>
              <th className="py-2 px-4 border-b">Quantity Left</th>
            </tr>
          </thead>
          <tbody>
            {books &&
              books.map((book) => (
                <tr key={book._id} className="hover:bg-gray-100 text-center">
                  <td className="py-2 px-4 border-b">{book.bookName}</td>
                  <td className="py-2 px-4 border-b">{book.genre}</td>
                  <td className="py-2 px-4 border-b">{book.author}</td>
                  <td className="py-2 px-4 border-b">{book.quantity}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllBooks;
