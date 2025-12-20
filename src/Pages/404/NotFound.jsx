import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-9xl font-extrabold text-[#102347]">404</h1>
      <p className="text-2xl md:text-3xl font-bold text-gray-800 mt-4">
        Page Not Found
      </p>
      <p className="text-gray-600 mt-2">
        Sorry, the page you are looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-[#102347] text-white rounded-lg shadow hover:bg-[#23365c] transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;