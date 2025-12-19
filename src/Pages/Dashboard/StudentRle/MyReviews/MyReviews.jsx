import React, { useState } from "react";

// Example data (replace with API/DB data)
const reviewsData = [
  {
    id: 1,
    scholarshipName: "Global Excellence Scholarship",
    universityName: "Oxford University",
    reviewComment: "Great opportunity, very supportive staff.",
    reviewDate: "2025-12-01",
    rating: 5,
  },
  {
    id: 2,
    scholarshipName: "Harvard Merit Scholarship",
    universityName: "Harvard University",
    reviewComment: "Competitive but rewarding experience.",
    reviewDate: "2025-11-20",
    rating: 4,
  },
];

const MyReviews = () => {
  const [reviews, setReviews] = useState(reviewsData);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  const openEdit = (review) => {
    setSelectedReview(review);
    setShowEdit(true);
  };

  const handleEditSubmit = () => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === selectedReview.id ? selectedReview : r
      )
    );
    setShowEdit(false);
  };

  const handleDelete = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
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
            {reviews.map((review) => (
              <tr key={review.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{review.scholarshipName}</td>
                <td className="px-4 py-3">{review.universityName}</td>
                <td className="px-4 py-3">{review.reviewComment}</td>
                <td className="px-4 py-3">{review.reviewDate}</td>
                <td className="px-4 py-3">{review.rating} ⭐</td>
                <td className="px-4 py-3 space-x-2">
                  {/* Edit */}
                  <button
                    onClick={() => openEdit(review)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
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
                  value={selectedReview.rating}
                  onChange={(e) =>
                    setSelectedReview({
                      ...selectedReview,
                      rating: parseInt(e.target.value),
                    })
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
                  value={selectedReview.reviewComment}
                  onChange={(e) =>
                    setSelectedReview({
                      ...selectedReview,
                      reviewComment: e.target.value,
                    })
                  }
                  className="mt-1 block w-full border rounded px-3 py-2"
                  rows="4"
                />
              </div>
              {/* Submit */}
              <div className="text-right">
                <button
                  onClick={handleEditSubmit}
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;