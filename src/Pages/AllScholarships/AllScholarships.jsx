import React, { useState } from "react";
import ScholarshipCard from "../../Components/ScholarshipCard";
import useAxios from "../../Hooks/useAxios"
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader";

// Todo: implement filtering logic and pagination

const AllScholarshipsPage = () => {

  const axios = useAxios();
 const [filters, setFilters] = useState({});

  const {data: scholarships = [], isLoading} = useQuery({
    queryKey: ['scholarships', filters],
    queryFn: async () => {
      const res = await axios.get('/scholarships');
      // console.log(res.data);
      return res.data;
    }
  })


  const handleFilter = (e) =>{
    e.preventDefault();
    const filterData = {
      subject: e.target.subject.value,
      degree: e.target.degree.value,
      funding: e.target.funding.value
    }
    setFilters(filterData);
    // console.log("Filters applied:", filterData);
    }
  
  if(isLoading){
        return <Loader></Loader>
    }


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
        <div >
          <form 
          onSubmit={handleFilter} 
          className="bg-white shadow-md rounded-xl p-6 flex flex-wrap gap-4 justify-between items-center">
            <select 
            name="subject"
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-400">
            <option>All Subjects</option>
            <option>Computer Science</option>
            <option>Engineering</option>
            <option>Business</option>
            <option>Health Sciences</option>
          </select>
          <select 
          subject="degree"
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-400">
            <option>All Degrees</option>
            <option>Diploma</option>
            <option>Bachelor</option>
            <option>Masters</option>
          </select>
          <select 
          name="funding"
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-400">
            <option>All Funding</option>
            <option>Full fund</option>
            <option>Partial</option>
            <option>Self-fund</option>
          </select>
          <button type="submit" className="bg-gradient-to-r from-[#102347] to-[#23365c] text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition">
            Apply Filters
          </button>
          </form>
        </div>
      </section>

      {/* Scholarships  Section */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <h2 className="text-2xl font-serif font-bold text-[#102347] mb-6">Available Scholarships</h2>
        
        {/* Card grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
         {
          scholarships.map(scholarship => <ScholarshipCard key={scholarship._id} scholarship={scholarship}></ScholarshipCard>)
         }
          
        </div>
      </section>

      {/* ToDo: Implement pagination */}
    </div>
  );
};

export default AllScholarshipsPage;