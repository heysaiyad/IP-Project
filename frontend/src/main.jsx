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
import Home from "./components/Home.jsx";
import UserInfo from "./components/UserInfo.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
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
        path: "/:id/issue-book",
        element: <IssueBooks />,
      },
      {
        path: "/scan-code",
        element: <ScanCode />,
      },
      {
        path: "/:id/userInfo",
        element: <UserInfo />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>,
);
