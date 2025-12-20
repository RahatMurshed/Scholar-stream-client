import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useSearchParams } from "react-router";

const PaymentSuccess = () => {

     const axiosSecure = useAxiosSecure();
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get('session_id')
    console.log(sessionId)

    useEffect(()=>{
        if(sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res=>{
                console.log(res.data);
                setPaymentInfo({
                    transectionId: res.data.transectionId,
                    

                })
            })
        }

    },[sessionId, axiosSecure, setPaymentInfo])
    

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      {/* Success Card */}
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-lg">
        {/* Success Icon */}
        <div className="flex items-center justify-center mb-6">
          <span className="text-6xl">✅</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-serif font-bold text-[#102347] mb-4">
          Payment Successful
        </h1>
        <h3 className="">{paymentInfo.transectionId}</h3>

        {/* Message */}
        <p className="text-gray-600 mb-8">
          Thank you for completing your payment. Your application has been submitted successfully.
        </p>

        {/* Dashboard Button */}
        <Link
          to="/dashboard/dashboard-home"
          className="inline-block bg-gradient-to-r from-[#102347] to-[#23365c] text-white px-8 py-3 rounded-full font-semibold shadow hover:scale-105 transition"
        >
          Go to Dashboard
        </Link>
      </div>

      {/* Footer Note */}
      <p className="mt-10 text-sm text-gray-500">
        ScholarStream • Empowering your academic journey
      </p>
    </div>
  );
};

export default PaymentSuccess;