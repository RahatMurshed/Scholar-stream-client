import React from "react";

const ScholarshipCard = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition">
      {/* University Image */}
      <img
        src="https://via.placeholder.com/400x200.png?text=University+Image"
        alt="University"
        className="h-40 w-full object-cover"
      />

      {/* Content */}
      <div className="p-6">
        {/* Scholarship Name */}
        <h3 className="text-xl font-serif font-bold text-[#102347] mb-2">
          Global Excellence Scholarship
        </h3>

        {/* University Info */}
        <p className="text-gray-600 text-sm mb-2">
          Oxford University • Oxford, United Kingdom
        </p>
        <p className="text-gray-500 text-sm mb-4">World Rank: #1</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700">
            Computer Science
          </span>
          <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700">
            Full Fund
          </span>
          <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
            Masters
          </span>
        </div>

        {/* Fees */}
        <div className="text-sm text-gray-600 mb-4">
          <p>Tuition Fees: $25,000</p>
          <p>Application Fees: $100</p>
          <p>Service Charge: $50</p>
        </div>

        {/* Deadline */}
        <p className="text-sm text-red-600 font-semibold mb-4">
          Deadline: 15 Jan 2026
        </p>

        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-[#102347] to-[#23365c] text-white py-2 rounded-full font-semibold shadow hover:scale-105 transition">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default ScholarshipCard;