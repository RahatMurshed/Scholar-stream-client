import React, { useState } from "react";

const scholarshipsData = [
  {
    id: 1,
    scholarshipName: "Global Excellence Scholarship",
    universityName: "Oxford University",
    country: "UK",
    city: "Oxford",
    worldRank: 1,
    subjectCategory: "Computer Science",
    scholarshipCategory: "Merit-based",
    degree: "Bachelor",
    tuitionFees: 20000,
    applicationFees: 100,
    serviceCharge: 20,
    deadline: "2025-12-31",
    postDate: "2025-11-01",
    userEmail: "admin@scholarstream.com",
  },
  {
    id: 2,
    scholarshipName: "Harvard Merit Scholarship",
    universityName: "Harvard University",
    country: "USA",
    city: "Cambridge",
    worldRank: 2,
    subjectCategory: "Economics",
    scholarshipCategory: "Need-based",
    degree: "Master",
    tuitionFees: 25000,
    applicationFees: 120,
    serviceCharge: 25,
    deadline: "2026-01-15",
    postDate: "2025-11-10",
    userEmail: "admin@scholarstream.com",
  },
];

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState(scholarshipsData);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  const handleDelete = (id) => {
    setScholarships((prev) => prev.filter((s) => s.id !== id));
  };

  const openEdit = (scholarship) => {
    setSelectedScholarship(scholarship);
    setShowEdit(true);
  };

  const handleEditSubmit = () => {
    setScholarships((prev) =>
      prev.map((s) =>
        s.id === selectedScholarship.id ? selectedScholarship : s
      )
    );
    setShowEdit(false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-serif font-bold text-[#102347] mb-8">
        Manage Scholarships
      </h1>

      {/* Scholarships Table */}
      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#102347] text-white">
            <tr>
              <th className="px-4 py-3">Scholarship Name</th>
              <th className="px-4 py-3">University Name</th>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Subject Category</th>
              <th className="px-4 py-3">Degree</th>
              <th className="px-4 py-3">Application Fees</th>
              <th className="px-4 py-3">Deadline</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{s.scholarshipName}</td>
                <td className="px-4 py-3">{s.universityName}</td>
                <td className="px-4 py-3">{s.country}</td>
                <td className="px-4 py-3">{s.city}</td>
                <td className="px-4 py-3">{s.subjectCategory}</td>
                <td className="px-4 py-3">{s.degree}</td>
                <td className="px-4 py-3">${s.applicationFees}</td>
                <td className="px-4 py-3">{s.deadline}</td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => openEdit(s)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {scholarships.length === 0 && (
              <tr>
                <td
                  colSpan="9"
                  className="text-center text-gray-500 py-6 font-medium"
                >
                  No scholarships available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showEdit && selectedScholarship && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold text-[#102347] mb-4">
              Edit Scholarship
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Scholarship Name
                </label>
                <input
                  type="text"
                  value={selectedScholarship.scholarshipName}
                  onChange={(e) =>
                    setSelectedScholarship({
                      ...selectedScholarship,
                      scholarshipName: e.target.value,
                    })
                  }
                  className="mt-1 block w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  University Name
                </label>
                <input
                  type="text"
                  value={selectedScholarship.universityName}
                  onChange={(e) =>
                    setSelectedScholarship({
                      ...selectedScholarship,
                      universityName: e.target.value,
                    })
                  }
                  className="mt-1 block w-full border rounded px-3 py-2"
                />
              </div>
              {/* Add more editable fields as needed */}
              <div className="text-right mt-4 space-x-2">
                <button
                  onClick={handleEditSubmit}
                  className="bg-[#102347] text-white px-4 py-2 rounded hover:bg-[#23365c]"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setShowEdit(false)}
                  className="bg-gray-300 text-[#102347] px-4 py-2 rounded hover:bg-gray-400"
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

export default ManageScholarships;