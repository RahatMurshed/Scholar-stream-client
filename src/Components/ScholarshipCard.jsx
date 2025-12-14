import React from "react";
import CardBtn from "./CardBtn";
import { Link } from "react-router";



const ScholarshipCard = ({scholarship}) => {

  

  const {universityImage, scholarshipName, universityName, universityCountry, universityCity,  subjectCategory, scholarshipCategory,  applicationFees, scholarshipLevel, applicationDeadline, _id} = scholarship;

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition flex flex-col h-full">
  {/* University Image */}
 <div>
   <img
    src={universityImage}
    alt="University Image"
    className="h-45 w-full object-cover border"
  />
 </div>

  <div className="p-6 flex flex-col justify-evenly h-full">
    {/* Scholarship Name */}
    <h3 className="text-xl font-serif font-bold text-[#102347] ">
      {scholarshipName}
    </h3>

    {/* University Info */}
    <p className="text-gray-600 text-sm flex items-center my-1">
      {universityName} • {universityCity}, {universityCountry}
    </p>

    {/* Tags */}
    <div className="flex flex-wrap gap-2 my-3">
      <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700">
        {subjectCategory}
      </span>
      <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700">
        {scholarshipCategory}
      </span>
      <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
        {scholarshipLevel}
      </span>
    </div>

    {/* Fees */}
    <div className="text-sm text-gray-600 ">
      <p>Application Fees: {applicationFees}</p>
    </div>

    {/* Deadline */}
    <p className="text-sm text-red-600 font-semibold my-3">
      Deadline: {applicationDeadline}
    </p>

    {/* Action Button */}
    <Link to={`/scholarship-details/${_id}`}><button className="w-full bg-gradient-to-r from-[#102347] to-[#23365c] text-white py-2 rounded-full font-semibold shadow hover:scale-105 transition">View Details</button></Link>
    
  </div>
</div>
    
  );
};

export default ScholarshipCard;