import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";



const MyReviews = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: reviewsData = [], refetch } = useQuery({
    queryKey: ['reviews', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?email=${user.email}`)
      // console.log(res.data)
      return res.data;
    }
  })



  const [selectedReview, setSelectedReview] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  const openEdit = (review) => {
    setSelectedReview(review);
    setShowEdit(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // console.log(selectedReview)
    const updatedData = {
      ratingPoint: e.target.rating.value,
      reviewComment: e.target.comment.value
    }
    axiosSecure.patch(`/reviews/${selectedReview._id}`, updatedData)
      .then(res => {
        // console.log(res.data);
        if (res.data.modifiedCount) {
          Swal.fire({
            title: "Edited!",
            text: "Your review has been updated.",
            icon: "success"
          });
          refetch();

        }
      })
    setShowEdit(false);
  };

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
            // console.log(res.data)
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your review has been deleted.",
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
        My Reviews
      </h1>

      {/* Reviews Table */}
      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#102347] text-white">
            <tr>
              <th className="px-4 py-3">Scholarship Name</th>
              <th className="px-4 py-3">University Name</th>
              <th className="px-4 py-3">Review Comment</th>
              <th className="px-4 py-3">Review Date</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {reviewsData.map((review) => (
              <tr key={review._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{review.scholarshipName}</td>
                <td className="px-4 py-3">{review.universityName}</td>
                <td className="px-4 py-3">{review.reviewComment}</td>
                <td className="px-4 py-3">{review.reviewDate}</td>
                <td className="px-4 py-3">{review.ratingPoint} ⭐</td>
                <td className="px-4 py-3 space-x-1 space-y-2">

                  <button
                    onClick={() => openEdit(review)}
                    className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
                  >
                    <FaRegEdit className="w-4 h-4" />

                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="bg-red-600 text-white p-1 rounded hover:bg-red-700"
                  >
                    <MdDeleteOutline className="w-4 h-4" />

                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showEdit && selectedReview && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold text-[#102347] mb-4">
              Edit Review
            </h2>
            <form
              onSubmit={handleEditSubmit}
              className="space-y-4">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  defaultValue={selectedReview.rating}
                  name="rating"
                  className="mt-1 block w-full border rounded px-3 py-2"
                />
              </div>
              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Comment
                </label>
                <textarea
                  defaultValue={selectedReview.reviewComment}
                  name="comment"
                  className="mt-1 block w-full border rounded px-3 py-2"
                  rows="4"
                />
              </div>
              {/* Submit */}
              <div className="text-right">
                <button
                  type="submit"

                  className="bg-[#102347] text-white px-4 py-2 rounded hover:bg-[#23365c]"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setShowEdit(false)}
                  className="ml-2 bg-gray-300 text-[#102347] px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;