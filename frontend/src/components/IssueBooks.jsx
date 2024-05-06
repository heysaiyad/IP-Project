import React, { useState } from "react";
import Input from "./Input";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import link from "./link.json";
function IssueBooks() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookName, setBookName] = useState("");
  const [err, setErr] = useState("");

  const handleIssue = async (e) => {
    const token = localStorage.getItem("jwtToken");

    if (!token) return setErr("Login to continue");
    try {
      setErr("");

      const res = await axios.post(
        `${link.url}/${id}/issue-book`,
        {
          bookName: bookName,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      alert("Book Issued");
      navigate(`/${id}/userInfo`);
    } catch (error) {
      if (error.response.status === 401) setErr("Book already issued");
      if (error.response.status === 404) setErr("Book Not found");
      else setErr(error.response.data.message || "An error occurred");
    }
  };
  return (
    <>
      {err && <div className="text-2xl text-red-600">{err}</div>}
      <div>IssueBooks</div>
      <Input
        text="Book Name"
        onChange={(e) => setBookName(e.target.value)}
        value={bookName}
      />
      <button className="border-2 border-black px-6 py-2" onClick={handleIssue}>
        Issue book
      </button>
    </>
  );
}

export default IssueBooks;
