import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ScholarshipDetails = () => {
  const axiosSecure = useAxiosSecure();
    const {id} = useParams();

    const {data: scholarship={} } = useQuery({
    queryKey: ['scholarshipDetails'],
    queryFn: async ()=>{
      const res = await axiosSecure.get(`/scholarship/${id}`)
        console.log(res.data);
        return res.data;
    
    }
    })

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[60vh] flex items-center justify-center text-center text-white">
        <img
          src={scholarship.universityImage}
          alt={scholarship.universityName}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#102347]/50 to-[#23365c]/60" />
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            {scholarship.scholarshipName}
          </h1>
          <p className="text-lg">
            {scholarship.universityName} • {scholarship.universityCity},{" "}
            {scholarship.universityCountry}
          </p>
          <p className="mt-2 text-sm text-gray-200 font-bold">
            World Rank #{scholarship.universityWorldRank}
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* Left Column: Key Info */}
        <div className="md:col-span-2 space-y-8">
          {/* Scholarship Overview */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-lg rounded-xl p-8"
          >
            <h2 className="text-2xl font-serif font-bold text-[#102347] mb-4">
              Overview
            </h2>
            <p className="text-gray-700 mb-4">
              {scholarship.scholarshipBenefits}
            </p>
            <ul className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <li><strong>Duration:</strong> {scholarship.duration}</li>
              <li><strong>Funding Source:</strong> {scholarship.fundingSource}</li>
              <li><strong>Application Mode:</strong> {scholarship.applicationMode}</li>
              <li><strong>Selection Process:</strong> {scholarship.selectionProcess}</li>
              <li><strong>Renewable:</strong> {scholarship.renewable ? "Yes" : "No"}</li>
              <li><strong>Number of Awards:</strong> {scholarship.numberOfAwards}</li>
            </ul>
          </motion.div>

          {/* Eligibility */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-lg rounded-xl p-8"
          >
            <h2 className="text-2xl font-serif font-bold text-[#102347] mb-4">
              Eligibility Criteria
            </h2>
            <p className="text-gray-700">{scholarship.eligibilityCriteria}</p>
            <ul className="mt-4 text-sm text-gray-600 space-y-2">
              <li><strong>Language Requirement:</strong> {scholarship.languageRequirement}</li>
              <li><strong>Age Limit:</strong> {scholarship.ageLimit}</li>
              <li><strong>Level:</strong> {scholarship.scholarshipLevel}</li>
              <li><strong>Country Priority:</strong> {scholarship.countryPriority}</li>
            </ul>
          </motion.div>

          {/* Internship Opportunity */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-lg rounded-xl p-8"
          >
            <h2 className="text-2xl font-serif font-bold text-[#102347] mb-4">
              Internship Opportunity
            </h2>
            <p className="text-gray-700">{scholarship.internshipOpportunity}</p>
          </motion.div>
        </div>

        {/* Right Column: Quick Facts */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-lg rounded-xl p-6"
          >
            <h3 className="text-xl font-serif font-bold text-[#102347] mb-4">
              Quick Facts
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>Tuition Fees:</strong> {scholarship.tuitionFees}</li>
              <li><strong>Application Fees:</strong> {scholarship.applicationFees}</li>
              <li><strong>Service Charge:</strong> {scholarship.serviceCharge}</li>
              <li><strong>Deadline:</strong> {scholarship.applicationDeadline}</li>
              <li><strong>Notification Date:</strong> {scholarship.notificationDate}</li>
              <li><strong>Status:</strong> {scholarship.scholarshipStatus}</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-lg rounded-xl p-6"
          >
            <h3 className="text-xl font-serif font-bold text-[#102347] mb-4">
              Contact Information
            </h3>
            <p className="text-sm text-gray-700">
              {scholarship.contactAddress}
            </p>
            <p className="text-sm text-gray-700 mt-2">
              Phone: {scholarship.contactPhone}
            </p>
            <p className="text-sm text-gray-700 mt-2">
              Email: {scholarship.postedUserEmail}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-lg rounded-xl p-6"
          >
            <h3 className="text-xl font-serif font-bold text-[#102347] mb-4">
              Required Documents
            </h3>
            <p className="text-sm text-gray-700">{scholarship.requiredDocuments}</p>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="bg-[#102347] text-white py-12 text-center">
        <h2 className="text-2xl font-serif font-bold mb-4">
          Ready to Apply?
        </h2>
        <p className="mb-6">
          Submit your application before <strong>{scholarship.applicationDeadline}</strong>.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-white text-[#102347] px-8 py-3 rounded-full font-semibold shadow-lg"
        >
          Apply Now
        </motion.button>
      </section>
    </div>
  );
};

export default ScholarshipDetails;