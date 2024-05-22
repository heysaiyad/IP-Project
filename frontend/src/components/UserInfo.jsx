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
        if (!token) return setErr("Login to continue");
        const response = await axios.get(`${link.url}/${id}/userInfo`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(response.data);
      } catch (error) {
        setErr(error.response?.data);
        console.log(error);
      }
    };
    userData();
  }, [id, token]);

  const handleReturn = async (bookName) => {
    navigate(`/${id}/${bookName}/return`);
  };

  const handleBookIssue = (e) => {
    e.preventDefault();
    navigate(`/${id}/issue-book`, { id: id });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  };

  return (
    <div className="flex flex-row items-center justify-evenly min-h-screen bg-gray-200">
      {err && <h2 className="text-red-700 text-2xl mb-4">{err}</h2>}
      {userInfo && (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">
            User Information
          </h1>
          <div className="mb-4">
            <h2 className="text-lg font-bold">Name:</h2>
            <p>{userInfo.name}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-bold">Mobile Number:</h2>
            <p>{userInfo.mobile}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-bold">Email:</h2>
            <p>{userInfo.email}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-bold">Fine:</h2>
            <p>{userInfo.fine}</p>
          </div>
        </div>
      )}
      <div className="flex flex-wrap justify-center items-center gap-5 flex-col">
        {userInfo.booksIssued && (
          <div className="mt-8 bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Books Issued
            </h2>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-3 text-center">Name</th>
                  <th className="border p-3 text-center">Issued Date</th>
                  <th className="border p-3 text-center">Return Date</th>
                  <th className="border p-3 text-center">Return</th>
                </tr>
              </thead>
              <tbody>
                {userInfo.booksIssued.map((book) => (
                  <tr key={book.name} className="border-b">
                    <td className="border p-3">{book.name}</td>
                    <td className="border p-3">{formatDate(book.issueDate)}</td>
                    <td className="border p-3">
                      {formatDate(book.returnDate)}
                    </td>
                    <td className="border p-3 text-center">
                      <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                        onClick={() => handleReturn(book.name)}
                      >
                        Return
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <button
          className="mt-8 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          onClick={handleBookIssue}
        >
          Issue a New Book
        </button>
      </div>
    </div>
  );
}

export default UserInfo;
