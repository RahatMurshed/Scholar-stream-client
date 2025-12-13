import React from "react";
import ScholarshipCard from "../../Components/ScholarshipCard/ScholarshipCard";

const AllScholarshipsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#102347] text-white py-12 px-6 text-center shadow-lg">
        <h1 className="text-4xl font-serif font-bold mb-4">Explore Scholarships</h1>
        <p className="max-w-2xl mx-auto text-gray-300 text-lg">
          Discover opportunities across top universities worldwide. Filter by subject, degree, or funding type
          to find the scholarship that matches your academic journey.
        </p>
      </section>

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-wrap gap-4 justify-between items-center">
          <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400">
            <option>All Subjects</option>
            <option>Computer Science</option>
            <option>Engineering</option>
            <option>Business</option>
            <option>Health Sciences</option>
          </select>
          <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400">
            <option>All Degrees</option>
            <option>Diploma</option>
            <option>Bachelor</option>
            <option>Masters</option>
          </select>
          <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400">
            <option>All Funding</option>
            <option>Full fund</option>
            <option>Partial</option>
            <option>Self-fund</option>
          </select>
          <button className="bg-gradient-to-r from-[#102347] to-[#23365c] text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition">
            Apply Filters
          </button>
        </div>
      </section>

      {/* Scholarships Grid Section */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <h2 className="text-2xl font-serif font-bold text-[#102347] mb-6">Available Scholarships</h2>
        
        {/* Grid container left blank for cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Scholarship cards will go here */}
          <ScholarshipCard></ScholarshipCard>
        </div>
      </section>
    </div>
  );
};

export default AllScholarshipsPage;