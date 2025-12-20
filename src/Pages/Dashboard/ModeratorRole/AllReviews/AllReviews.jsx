import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const AllReviews = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviewsData = [], refetch } = useQuery({
    queryKey: ['all-reviews'],
    queryFn: async () => {
      const res = await axiosSecure.get('/reviews')
      console.log(res.data)
      return res.data
    }
  })



  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axiosSecure.delete(`/reviews/${id}`)
          .then(res => {
            console.log(res.data)
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Review has been deleted.",
                icon: "success"
              });
              refetch();
            }

          })
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-serif font-bold text-[#102347] mb-8">
        All Student Reviews
      </h1>

      {/* Reviews Table */}
      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#102347] text-white">
            <tr>
              <th className="px-4 py-3">Scholarship Name</th>
              <th className="px-4 py-3">University Name</th>
              <th className="px-4 py-3">User Name</th>
              <th className="px-4 py-3">Review Comment</th>
              <th className="px-4 py-3">Review Date</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviewsData.map((review) => (
              <tr key={review.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{review.scholarshipName}</td>
                <td className="px-4 py-3">{review.universityName}</td>
                <td className="px-4 py-3">{review.userName}</td>
                <td className="px-4 py-3">{review.reviewComment}</td>
                <td className="px-4 py-3">{review.reviewDate}</td>
                <td className="px-4 py-3">{review.ratingPoint} ⭐</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {reviewsData.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-gray-500 py-6 font-medium"
                >
                  No reviews available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllReviews;