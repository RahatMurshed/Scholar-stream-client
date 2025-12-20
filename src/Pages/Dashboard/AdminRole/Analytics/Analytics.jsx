import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const axiosSecure = useAxiosSecure();

   const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = axiosSecure.get('/users')
      return (await res).data;
    }
  })

  const { data: scholarships = [] } = useQuery({
    queryKey: ['scholarships'],
    queryFn: async () => {
      const res = axiosSecure.get('/scholarships')
      return (await res).data;
    }
  })


  const { data: applicationStatsByUniversity = [] } = useQuery({
    queryKey: ['application-stats', scholarships],
    queryFn: async () => {
      const res = axiosSecure.get('/application/university/stats')
      return (await res).data;
    }
  })


  const { data:applicationStatsByScholarshipName = [] } = useQuery({
    queryKey: ['application-stats', scholarships],
    queryFn: async () => {
      const res = axiosSecure.get('/application/university/stats')
      return (await res).data;
    }
  })


  const { data: feesCollected = [] } = useQuery({
    queryKey: ['application-fees', scholarships],
    queryFn: async () => {
      const res = axiosSecure.get('/total-application-fees')
      return (await res).data;
    }
  })

 

  const totalFees = feesCollected.map(app=> app.applicationFees + app.serviceCharge)
  console.log(totalFees)


console.log(applicationStatsByUniversity)



  

 

 const applicationsByUniversity = {
  labels: applicationStatsByUniversity.map((item) => item._id), // university names
  datasets: [
    {
      label: "Applications",
      data: applicationStatsByUniversity.map((item) => item.count), 
      backgroundColor: [
        "#102347",
        "#23365c",
        "#4f46e5",
        "#10b981",
        "#f59e0b",
        "#ef4444",
        "#6366f1",
        "#14b8a6",
      ], 
    },
  ],
};
 const applicationByScholarshipName = {
  labels: applicationStatsByScholarshipName.map((item) => item._id), // university names
  datasets: [
    {
      label: "Applications",
      data: applicationStatsByScholarshipName.map((item) => item.count), 
      backgroundColor: [
        "#102347",
        "#23365c",
        "#4f46e5",
        "#10b981",
        "#f59e0b",
        "#ef4444",
        "#6366f1",
        "#14b8a6",
      ], 
    },
  ],
};




  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <h1 className="text-3xl font-serif font-bold text-[#102347]">
        Platform Analytics
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-bold text-[#102347]">{users.length}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500">Total Fees Collected</p>
          <p className="text-2xl font-bold text-[#102347]">${totalFees}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500">Total Scholarships</p>
          <p className="text-2xl font-bold text-[#102347]">{scholarships.length}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="">
        {/* Bar Chart */}
        <div className="bg-white shadow rounded-xl p-6 mx-auto max-w-5xl">
          <h2 className="text-xl font-serif font-bold text-[#102347] mb-4">
            Applications per University
          </h2>
          <Bar data={applicationsByUniversity} />
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow rounded-xl p-6 mt-20 max-w-2xl mx-auto">
          <h2 className="text-xl font-serif font-bold text-[#102347] mb-4">
            Applications by Scholarship Category
          </h2>
          <Pie data={applicationByScholarshipName} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;