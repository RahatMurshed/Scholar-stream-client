import React from "react";
import { Link, useLocation } from "react-router";

const PaymentCancelPage = () => {
  const location = useLocation();
  const { scholarship, errorMessage } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      {/* Cancel Card */}
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-lg w-full">
        {/* Failed Icon */}
        <div className="flex items-center justify-center mb-6">
          <span className="text-6xl">❌</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-serif font-bold text-red-600 mb-4">
          Payment Failed
        </h1>

        {/* Scholarship Name */}
        {scholarship && (
          <p className="text-gray-700 mb-4">
            Scholarship:{" "}
            <span className="font-semibold text-[#102347]">
              {scholarship.scholarshipName}
            </span>
          </p>
        )}

        {/* Error Message */}
        {errorMessage && (
          <p className="text-sm text-red-500 mb-6">
            Error: {errorMessage}
          </p>
        )}

        {/* Action Button */}
        <Link
          to="/dashboard/dashboard-home"
          className="inline-block bg-gradient-to-r from-[#102347] to-[#23365c] text-white px-8 py-3 rounded-full font-semibold shadow hover:scale-105 transition"
        >
          Return to Dashboard
        </Link>
      </div>

      {/* Footer Note */}
      <p className="mt-10 text-sm text-gray-500">
        ScholarStream • Secure payments for your academic journey
      </p>
    </div>
  );
};

export default PaymentCancelPage;