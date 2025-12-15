import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loader from '../../Components/Loader';
import ScholarStreamNavbarButton from '../../Components/Button';
import useAuth from '../../Hooks/useAuth';


const Payment = () => {

    const {id} = useParams();
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data:scholarship={} , isLoading} = useQuery({
        queryKey: ['scholarship', id],
        queryFn: async ()=>{
           const res = await axiosSecure.get(`/scholarship/${id}`)
           console.log(res.data)
            return res.data;
        }
    })

     const totalAmount =
    parseInt(scholarship.applicationFees.replace("$", "")) +
    parseInt(scholarship.serviceCharge.replace("$", ""));
    

    const  handlePayment = async ()=>{
        const paymentInfo = {
            price: totalAmount,
            id: scholarship._id,
            customerEmail: user.email,
            scholarshipName: scholarship.scholarshipName

        }
        console.log(paymentInfo)
        console.log(totalAmount)

        const res = await axiosSecure.post('/checkout', paymentInfo);
        console.log(res.data);
        window.location.href = res.data.url;
        
    }

    if(isLoading){
        return <Loader></Loader>
    }

   



    return (
        <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <section className="relative h-[40vh] flex items-center justify-center text-center text-white">
        <img
          src={scholarship.universityImage}
          alt={scholarship.universityName}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#102347]/60 to-[#23365c]/50" />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">
            Scholarship Payment
          </h1>
          <p className="text-lg">
            {scholarship.scholarshipName} • {scholarship.universityName}
          </p>
        </div>
      </section>

      {/* Payment Details */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-serif font-bold text-[#102347] mb-6">
            Payment Summary
          </h2>

          <div className="space-y-4 text-gray-700">
            <div className="flex justify-between">
              <span className="font-semibold">Application Fees:</span>
              <span>{scholarship.applicationFees}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Service Charge:</span>
              <span>{scholarship.serviceCharge}</span>
            </div>
            <div className="border-t pt-4 flex justify-between text-lg font-bold text-[#102347]">
              <span>Total Amount:</span>
              <span>${totalAmount}</span>
            </div>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Application deadline: <strong>{scholarship.applicationDeadline}</strong>
          </p>

          <button
              onClick={handlePayment}
              className="w-full bg-gradient-to-r from-[#102347] to-[#23365c] text-white py-2 mt-5 rounded-full font-semibold shadow hover:scale-105 transition"
            >
              Pay ${totalAmount}
            </button>

        </div>
      </section>
    </div>
    );
};

export default Payment;


