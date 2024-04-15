import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login.jsx";
import AddUser from "./components/AddUser.jsx";
import AddBooks from "./components/AddBooks.jsx";
import IssueBooks from "./components/IssueBooks.jsx";
import ScanCode from "./components/ScanCode.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/add-user",
        element: <AddUser />,
      },
      {
        path: "/add-books",
        element: <AddBooks />,
      },
      {
        path: "/issue-books",
        element: <IssueBooks />,
      },
      {
        path: "/scan-code",
        element: <ScanCode />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
