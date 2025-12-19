import React, { useState } from "react";

// Example data (replace with API/DB data)
const applicationsData = [
  {
    id: 1,
    universityName: "Oxford University",
    universityAddress: "Oxford, UK",
    feedback: "Strong candidate, awaiting payment",
    subjectCategory: "Computer Science",
    applicationFees: 100,
    applicationStatus: "pending",
    paymentStatus: "unpaid",
  },
  {
    id: 2,
    universityName: "Harvard University",
    universityAddress: "Cambridge, MA, USA",
    feedback: "Excellent profile",
    subjectCategory: "Economics",
    applicationFees: 120,
    applicationStatus: "completed",
    paymentStatus: "paid",
  },
];

const MyApplications = () => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [review, setReview] = useState({ rating: 0, comment: "" });

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
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-serif font-bold text-[#102347] mb-8">
        My Applications
      </h1>

      {/* Applications Table */}
      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#102347] text-white">
            <tr>
              <th className="px-4 py-3">University Name</th>
              <th className="px-4 py-3">University Address</th>
              <th className="px-4 py-3">Feedback</th>
              <th className="px-4 py-3">Subject Category</th>
              <th className="px-4 py-3">Application Fees</th>
              <th className="px-4 py-3">Application Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicationsData.map((app) => (
              <tr key={app.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{app.universityName}</td>
                <td className="px-4 py-3">{app.universityAddress}</td>
                <td className="px-4 py-3">{app.feedback}</td>
                <td className="px-4 py-3">{app.subjectCategory}</td>
                <td className="px-4 py-3">${app.applicationFees}</td>
                <td className="px-4 py-3 capitalize">{app.applicationStatus}</td>
                <td className="px-4 py-3 space-x-2 space-y-2">
                  {/* Details */}
                  <button
                    onClick={() => openDetails(app)}
                    className="bg-blue-600 text-white text-[12px] px-3 py-1 rounded hover:bg-blue-700 font-semibold"
                  >
                    Details
                  </button>

                  {/* Edit (pending only) */}
                  {app.applicationStatus === "pending" && (
                    <button className="bg-purple-600 text-white px-3 py-1 rounded text-[12px] hover:bg-purple-800 font-semibold">
                      Edit
                    </button>
                  )}

                  {/* Pay (pending + unpaid) */}
                  {app.applicationStatus === "pending" &&
                    app.paymentStatus === "unpaid" && (
                      <button className="bg-green-600 text-white px-[13px] py-1 rounded text-[12px]  hover:bg-green-700 font-semibold">
                        Pay
                      </button>
                    )}

                  {/* Delete (pending only) */}
                  {app.applicationStatus === "pending" && (
                    <button className="bg-red-600 text-white text-[12px] px-3 py-1 rounded hover:bg-red-700 font-semibold">
                      Delete
                    </button>
                  )}

                  {/* Add Review (completed only) */}
                  {app.applicationStatus === "completed" && (
                    <button
                      onClick={() => openReview(app)}
                      className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                    >
                      Add Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
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