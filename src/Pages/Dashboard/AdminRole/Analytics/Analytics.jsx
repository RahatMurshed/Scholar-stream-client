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
  // Example summary stats (replace with API data)
  const totalUsers = 120;
  const totalFeesCollected = 45000;
  const totalScholarships = 35;

  // Example chart data (replace with API data)
  const applicationsByUniversity = {
    labels: ["Oxford", "Harvard", "MIT", "Stanford"],
    datasets: [
      {
        label: "Applications",
        data: [25, 40, 30, 20],
        backgroundColor: ["#102347", "#23365c", "#4f46e5", "#10b981"],
      },
    ],
  };

  const applicationsByCategory = {
    labels: ["Merit-based", "Need-based", "Research", "Sports"],
    datasets: [
      {
        label: "Applications",
        data: [50, 30, 20, 10],
        backgroundColor: ["#102347", "#23365c", "#4f46e5", "#10b981"],
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
          <p className="text-2xl font-bold text-[#102347]">{totalUsers}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500">Total Fees Collected</p>
          <p className="text-2xl font-bold text-[#102347]">${totalFeesCollected}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500">Total Scholarships</p>
          <p className="text-2xl font-bold text-[#102347]">{totalScholarships}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Bar Chart */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-serif font-bold text-[#102347] mb-4">
            Applications per University
          </h2>
          <Bar data={applicationsByUniversity} />
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-serif font-bold text-[#102347] mb-4">
            Applications by Scholarship Category
          </h2>
          <Pie data={applicationsByCategory} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;