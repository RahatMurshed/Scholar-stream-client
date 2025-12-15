import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Register from "../Pages/Auth/Register/Register";
import Login from "../Pages/Auth/Login/Login";
import AllScholarships from "../Pages/AllScholarships/AllScholarships";
import Home from "../Pages/Home/Home";
import ScholarshipDetails from "../Pages/ScholarshipDetails/ScholarshipDetails";
import PrivateRoute from "./PrivateRoute";
import Payment from "../Pages/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
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
      },
      {
        path: '/scholarship-details/:id',
        element: <PrivateRoute>
          <ScholarshipDetails></ScholarshipDetails>
        </PrivateRoute>
      },
      {
        path: '/payment/:id',
        element: <PrivateRoute>
          <Payment></Payment>
        </PrivateRoute>
      },
    ]
  },
]);