import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline, MdOutlineReviews, MdPayment } from "react-icons/md";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Button from '../../../../Components/Button'
import { Link } from "react-router";


const MyApplications = () => {

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: applicationsData = [], refetch } = useQuery({
    queryKey: ['applicationData', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-applications?email=${user.email}`);
      console.log(res.data);
      return res.data;
    }
  })

  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [review, setReview] = useState({ rating: 0, comment: "" });

  const handlePayment = async (app) => {
    const totalAmount = parseInt(app.applicationFees) + parseInt(app.serviceCharge);
    console.log(totalAmount)

    const paymentInfo = {
      price: totalAmount,
      id: app.scholarshipId,
      customerEmail: user.email,
      scholarshipName: app.scholarshipName

    }

    const res = await axiosSecure.post('/checkout', paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  }

  const openDetails = (app) => {
    setSelectedApp(app);
    setShowDetails(true);
  };

  const openReview = (app) => {
    setSelectedApp(app);
    setShowReview(true);
  };

  const handleReviewSubmit = () => {
    console.log("Review submitted:", review);
    setShowReview(false);
    setReview({ rating: 0, comment: "" });
  };

  return (
    <div className="max-w-8xl mx-auto">
      <h1 className="text-3xl font-serif font-bold text-[#102347] mb-8">
        My Applications
      </h1>

      {/* Applications Table */}
      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#102347] text-white">
            <tr>
              <th className="px-4 py-3">Scholarship Name</th>
              <th className="px-4 py-3">University Name</th>

              <th className="px-4 py-3">Feedback</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Fees</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Payment Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicationsData.map((app) => (
              <tr key={app._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{app.scholarshipName}</td>
                <td className="px-4 py-3">{app.universityName}</td>

                <td className="px-4 py-3">{app.feedback}</td>
                <td className="px-4 py-3">{app.subjectCategory}</td>
                <td className="px-4 py-3">${parseInt(app.applicationFees) + parseInt(app.serviceCharge)}</td>
                <td className="px-4 py-3 capitalize">{app.applicationStatus}</td>
                <td className="px-4 py-3 capitalize">{app.paymentStatus}</td>
                <td className="px-4 py-3 space-x-2 space-y-2">
                  {/* Details */}
                  <button
                    onClick={() => openDetails(app)}
                    className="bg-blue-600 text-white text-[12px] p-2 rounded hover:bg-blue-700 font-semibold"
                  >
                    <CgDetailsMore className="w-4 h-4" />

                  </button>

                  {/* Edit (pending only) */}
                  {app.applicationStatus === "Pending" && (
                    <button className="bg-purple-600 text-white p-2 rounded text-[12px] hover:bg-purple-800 font-semibold">
                      <FaEdit className="w-4 h-4" />

                    </button>
                  )}

                  {/* Pay (pending + unpaid) */}
                  {app.applicationStatus === "Pending" &&
                    app.paymentStatus === "Unpaid" && (
                      <button
                        onClick={() => { handlePayment(app) }}
                        className="bg-green-600 text-white p-2 rounded text-[12px]  hover:bg-green-700 font-semibold">
                        <MdPayment className="w-4 h-4" />

                      </button>
                    )}

                  {/* Delete (pending only) */}
                  {app.applicationStatus === "Pending" && (
                    <button className="bg-red-600 text-white text-[12px] p-2 rounded hover:bg-red-700 font-semibold">
                      <MdDeleteOutline className="w-4 h-4" />

                    </button>
                  )}

                  {/* Add Review (completed only) */}
                  {app.applicationStatus === "completed" && (
                    <button
                      onClick={() => openReview(app)}
                      className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
                    >
                      <MdOutlineReviews className="h-4 w-5" />
                    </button>
                  )}
                </td>

              </tr>



            ))}
            {applicationsData.length === 0 && (
              <tr>
                <td
                  colSpan="9"
                  className="text-center text-gray-500 py-6 font-medium"
                >
                  <p>No application available for the user.</p>
                  <Link to='/all-scholarships'><Button label="Browse Scholarship" className="mt-3"></Button></Link>
                </td>

              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {showDetails && selectedApp && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold text-[#102347] mb-4">
              Application Details
            </h2>
            <p><strong>University:</strong> {selectedApp.universityName}</p>
            <p><strong>Address:</strong> {selectedApp.universityAddress}</p>
            <p><strong>Subject:</strong> {selectedApp.subjectCategory}</p>
            <p><strong>Fees:</strong> ${selectedApp.applicationFees}</p>
            <p><strong>Status:</strong> {selectedApp.applicationStatus}</p>
            <p><strong>Feedback:</strong> {selectedApp.feedback}</p>
            <div className="mt-6 text-right">
              <button
                onClick={() => setShowDetails(false)}
                className="bg-[#102347] text-white px-4 py-2 rounded hover:bg-[#23365c]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReview && selectedApp && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold text-[#102347] mb-4">
              Add Review for {selectedApp.universityName}
            </h2>
            <div className="space-y-4">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={review.rating}
                  onChange={(e) =>
                    setReview({ ...review, rating: e.target.value })
                  }
                  className="mt-1 block w-full border rounded px-3 py-2"
                />
              </div>
              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Comment
                </label>
                <textarea
                  value={review.comment}
                  onChange={(e) =>
                    setReview({ ...review, comment: e.target.value })
                  }
                  className="mt-1 block w-full border rounded px-3 py-2"
                  rows="4"
                />
              </div>
              {/* Submit */}
              <div className="text-right">
                <button
                  onClick={handleReviewSubmit}
                  className="bg-[#102347] text-white px-4 py-2 rounded hover:bg-[#23365c]"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;