import React, { useState } from "react";

const applicationsData = [
  {
    id: 1,
    applicantName: "Rahat",
    applicantEmail: "rahat@student.com",
    universityName: "Oxford University",
    feedback: "Awaiting review",
    status: "pending",
    paymentStatus: "unpaid",
    subjectCategory: "Computer Science",
    fees: 100,
  },
];

const ManageApplications = () => {
  const [apps, setApps] = useState(applicationsData);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  const openDetails = (app) => {
    setSelectedApp(app);
    setShowDetails(true);
  };

  const openFeedback = (app) => {
    setSelectedApp(app);
    setShowFeedback(true);
  };

  const handleFeedbackSubmit = () => {
    setApps((prev) =>
      prev.map((a) =>
        a.id === selectedApp.id ? { ...a, feedback: feedbackText } : a
      )
    );
    setShowFeedback(false);
    setFeedbackText("");
  };

  const updateStatus = (id, newStatus) => {
    setApps((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  const cancelApplication = (id) => {
    setApps((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "rejected" } : a))
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-serif font-bold text-[#102347] mb-8">
        Manage Applied Applications
      </h1>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#102347] text-white">
            <tr>
              <th className="px-4 py-3">Applicant Name</th>
              <th className="px-4 py-3">Applicant Email</th>
              <th className="px-4 py-3">University Name</th>
              <th className="px-4 py-3">Feedback</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Payment Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app) => (
              <tr key={app.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{app.applicantName}</td>
                <td className="px-4 py-3">{app.applicantEmail}</td>
                <td className="px-4 py-3">{app.universityName}</td>
                <td className="px-4 py-3">{app.feedback}</td>
                <td className="px-4 py-3 capitalize">{app.status}</td>
                <td className="px-4 py-3">{app.paymentStatus}</td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => openDetails(app)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => openFeedback(app)}
                    className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                  >
                    Feedback
                  </button>
                  <select
                    onChange={(e) => updateStatus(app.id, e.target.value)}
                    value={app.status}
                    className="border rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button
                    onClick={() => cancelApplication(app.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {showDetails && selectedApp && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold text-[#102347] mb-4">
              Application Details
            </h2>
            <p><strong>Applicant:</strong> {selectedApp.applicantName}</p>
            <p><strong>Email:</strong> {selectedApp.applicantEmail}</p>
            <p><strong>University:</strong> {selectedApp.universityName}</p>
            <p><strong>Subject:</strong> {selectedApp.subjectCategory}</p>
            <p><strong>Fees:</strong> ${selectedApp.fees}</p>
            <p><strong>Status:</strong> {selectedApp.status}</p>
            <p><strong>Payment:</strong> {selectedApp.paymentStatus}</p>
            <div className="mt-6 text-right">
              <button
                onClick={() => setShowDetails(false)}
                className="bg-[#102347] text-white px-4 py-2 rounded hover:bg-[#23365c]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedback && selectedApp && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold text-[#102347] mb-4">
              Write Feedback
            </h2>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows="4"
            />
            <div className="mt-4 text-right space-x-2">
              <button
                onClick={handleFeedbackSubmit}
                className="bg-[#102347] text-white px-4 py-2 rounded hover:bg-[#23365c]"
              >
                Submit
              </button>
              <button
                onClick={() => setShowFeedback(false)}
                className="bg-gray-300 text-[#102347] px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplications;