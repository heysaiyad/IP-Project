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
import ReturnBook from "./components/ReturnBook.jsx";
import AllBooks from "./components/AllBooks.jsx";
import IssuedBooks from "./components/IssuedBooks.jsx";
import store from "./Store/store.js";
import { Provider } from "react-redux";

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
      {
        path: "/:id/:bookName/return",
        element: <ReturnBook />,
      },
      {
        path: "/all-books",
        element: <AllBooks />,
      },
      {
        path: "/issued-books",
        element: <IssuedBooks />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </>,
);
