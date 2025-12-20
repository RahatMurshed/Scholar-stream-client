import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Register from "../Pages/Auth/Register/Register";
import Login from "../Pages/Auth/Login/Login";
import AllScholarships from "../Pages/AllScholarships/AllScholarships";
import Home from "../Pages/Home/Home";
import ScholarshipDetails from "../Pages/ScholarshipDetails/ScholarshipDetails";
import PrivateRoute from "./PrivateRoute";
import Payment from "../Pages/Payment/Payment";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import PaymentCancel from "../Pages/Payment/PaymentCancel";
import DashboardLayout from "../Layouts/DashboardLayout";

import MyApplications from "../Pages/Dashboard/StudentRle/MyApplications/MyApplications";
import MyReviews from "../Pages/Dashboard/StudentRle/MyReviews/MyReviews";

import ManageApplications from "../Pages/Dashboard/ModeratorRole/ManageApplications/ManageApplications";
import AllReviews from "../Pages/Dashboard/ModeratorRole/AllReviews/AllReviews";

import AddScholarship from "../Pages/Dashboard/AdminRole/AddScholarship/AddScholarship";
import Analytics from "../Pages/Dashboard/AdminRole/Analytics/Analytics";
import ManageUsers from "../Pages/Dashboard/AdminRole/ManageUser/ManageUser";
import ManageScholarships from "../Pages/Dashboard/AdminRole/ManageScholarship/ManageScholarship";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";


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
      {
        path: 'payment-success',
        element: <PrivateRoute>
          <PaymentSuccess></PaymentSuccess>
        </PrivateRoute>,
      },
      {
        path: 'payment-cancelled',
        element: <PrivateRoute>
          <PaymentCancel></PaymentCancel>
        </PrivateRoute>,
      },
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children: [
      {
        path: 'dashboard-home',
        Component: DashboardHome,
        
      },
      {
        path: 'my-applications',
        Component: MyApplications,
      },
      {
        path: 'my-reviews',
        Component: MyReviews,
      },

      {
        path: 'manage-applications',
        Component: ManageApplications,
      },
      {
        path: 'all-reviews',
        Component: AllReviews,
      },

      {
        path: 'add-scholarship',
        Component: AddScholarship,
      },
      {
        path: 'manage-scholarships',
        Component: ManageScholarships,
      },
      {
        path: 'manage-user',
        Component: ManageUsers,
      },
      {
        path: 'analytics',
        Component: Analytics,
      },
    ]
  }
]);