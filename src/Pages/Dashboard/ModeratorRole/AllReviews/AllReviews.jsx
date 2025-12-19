import React, { useState } from "react";

const reviewsData = [
  {
    id: 1,
    scholarshipName: "Global Excellence Scholarship",
    universityName: "Oxford University",
    comment: "Amazing opportunity!",
    date: "2025-12-01",
    rating: 5,
  },
  {
    id: 2,
    scholarshipName: "Harvard Merit Scholarship",
    universityName: "Harvard University",
    comment: "Competitive but rewarding experience.",
    date: "2025-11-20",
    rating: 4,
  },
];

const AllReviews = () => {
  const [reviews, setReviews] = useState(reviewsData);

  const handleDelete = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
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
                <td className="px-4 py-3">{review.comment}</td>
                <td className="px-4 py-3">{review.date}</td>
                <td className="px-4 py-3">{review.rating} ⭐</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
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