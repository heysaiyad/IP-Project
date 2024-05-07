import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import link from "./link.json";
function UserInfo() {
  const { id } = useParams();
  const token = localStorage.getItem("jwtToken");

  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const userData = async () => {
      try {
        if (!token) return setErr("Login To continue");
        const response = await axios.get(`${link.url}/${id}/userInfo`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setUserInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    userData();
  }, [id]);

  const handleReturn = async (bookName) => {
    {
      /*
console.log(bookName);
    await axios.post(`${link.url}/return-book`, {
      bookName: bookName,
      id: id,
    });

  */
    }
    navigate(`/${id}/${bookName}/return`);
  };

  const handleBookIssue = (e) => {
    e.preventDefault();
    navigate(`/${id}/issue-book`, { id: id });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  return (
    <>
      {err && <h2 className="text-red-700 text-2xl"> {err} </h2>}
      {userInfo && (
        <div>
          <h1>Name: {userInfo.name}</h1>
          <h1>Mobile Number: {userInfo.mobile}</h1>
          <h1>Email: {userInfo.email}</h1>
          <h1>Fine: {userInfo.fine}</h1>
        </div>
      )}
      {userInfo.booksIssued && (
        <div>
          <h2>Books Issued:</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Issued Date</th>
                <th>Return Date</th>
                <th>Return</th>
              </tr>
            </thead>
            <tbody>
              {userInfo.booksIssued.map((book) => (
                <tr key={book.name}>
                  <td>{book.name}</td>
                  <td>{formatDate(book.issueDate)}</td>
                  <td>{formatDate(book.returnDate)}</td>
                  <td>
                    <button onClick={() => handleReturn(book.name)}>
                      Return {book.name}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}{" "}
      <button
        className="border-4 border-black px-4 py-2"
        onClick={handleBookIssue}
      >
        Issue a new book
      </button>
    </>
  );
}

export default UserInfo;
