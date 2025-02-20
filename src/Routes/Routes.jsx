import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AuthPage from "../pages/AuthPage/AuthPage/AuthPage";
import Login from "../pages/AuthPage/Login/Login";
import Home from "../pages/Home/Home/Home";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home></Home>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "auth",
    element: <AuthPage></AuthPage>,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
    ],
  },
]);
