import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Register from "../Pages/Auth/Register/Register";
import Login from "../Pages/Auth/Login/Login";
import AllScholarships from "../Pages/AllScholarships/AllScholarships";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: '/register',
        Component: Register
      },
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/all-scholarships',
        Component: AllScholarships
      }
    ]
  },
]);