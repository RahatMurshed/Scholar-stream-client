import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const Payment = () => {

    const {id} = useParams();
    const axiosSecure = useAxiosSecure();

    const {data:parcel , isLoading} = useQuery({
        queryKey: ['parcels', id],
        queryFn: async ()=>{
           const res = await axiosSecure.get(`/parcels/${id}`)
            return res.data;
        }
    })

    const  handlePayment = async ()=>{
        const paymentInfo = {
            price: parcel.price,
            id: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName

        }

        const res = await axiosSecure.post(`/checkout`, paymentInfo)
        console.log(res.data)
        window.location.href = res.data.url;
        
    }

    if(isLoading){
        return <div className=' '><span className="loading loading-spinner text-success "></span></div>;
    }


    return (
        <div>
            <h2 className='text-2xl font-semibold'>please pay ${parcel.price} for {parcel.parcelName}</h2>
            <button
            onClick={handlePayment} className='bg-primary text-black btn btn-sm'>Pay now</button>
        </div>
    );
};

export default Payment;