import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { VscFeedback } from "react-icons/vsc";
import { CgDetailsMore } from "react-icons/cg";
import { MdOutlineCancel } from "react-icons/md";
import Swal from "sweetalert2";


const ManageApplications = () => {

  const axiosSecure = useAxiosSecure();

  const { data: applicationsData = [], refetch } = useQuery({
    queryKey: ['applicationData'],
    queryFn: async () => {
      const res = await axiosSecure.get('/applications')
      console.log(res.data)
      return res.data;
    }
  })



  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  console.log(feedbackText)
  const openDetails = (applicationsData) => {
    setSelectedApp(applicationsData);
    setShowDetails(true);
  };

  const openFeedback = (app) => {
    setSelectedApp(app);
    setShowFeedback(true);
  };

  const handleFeedbackSubmit = () => {
    const updatedData = {
      feedback: feedbackText
    }
    axiosSecure.patch(`/application/${selectedApp._id}/feedback`, updatedData)
      .then(res => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your review has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          refetch();
        }
      })

    setShowFeedback(false);

  };

  const updateStatus = (id, newStatus) => {

    const updatedData = {
      applicationStatus: newStatus
    }
    axiosSecure.patch(`/application/${id}/status`, updatedData)
      .then(res => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your status has been changed",
            showConfirmButton: false,
            timer: 1500
          });
          refetch();
        }
      })

  };

  const cancelApplication = (id) => {
    const updatedData = {
      applicationStatus: "Rejected"
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Reject"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/application/${id}/status`, updatedData)
          .then(res => {
            console.log(res.data);
            if (res.data.modifiedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "You rejected the application",
                icon: "success"
              });
              refetch();
            }
          })
      }
    });
  };

  return (
    <div className="max-w-8xl mx-auto">
      <h1 className="text-3xl font-serif font-bold text-[#102347] mb-8">
        Manage Applied Applications
      </h1>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#102347] text-white">
            <tr>
              <th className="px-4 py-3">Applicant Name</th>
              <th className="px-4 py-3">Applicant Email</th>
              <th className="px-4 py-3">Scholarship Name</th>
              <th className="px-4 py-3">University Name</th>
              <th className="px-4 py-3">Feedback</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Payment Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicationsData.map((app) => (
              <tr key={app._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{app.userName}</td>
                <td className="px-4 py-3">{app.userEmail}</td>
                <td className="px-4 py-3">{app.scholarshipName}</td>
                <td className="px-4 py-3">{app.universityName}</td>
                <td className="px-4 py-3">{app.feedback}</td>
                <td className={`px-4 py-3 capitalize font-semibold ${app.applicationStatus === 'Processing'&& "text-yellow-600"} ${app.applicationStatus === 'Pending'&& "text-yellow-600"} ${app.applicationStatus === 'Rejected'&& "text-red-600"}  ${app.applicationStatus === 'Completed'&& "text-green-600"}`}>{app.applicationStatus}</td>
                <td className="px-4 py-3">{app.paymentStatus}</td>
                <td className="px-4 py-3 space-x-1">
                  <button
                    onClick={() => openDetails(app)}
                    className="bg-blue-600 text-white p-1 rounded hover:bg-blue-700"
                  >
                    <CgDetailsMore className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openFeedback(app)}
                    className="bg-purple-600 text-white p-1 rounded hover:bg-purple-700"
                  >
                    <VscFeedback className="w-4 h-4 " />
                  </button>
                  <select
                    onChange={(e) => updateStatus(app._id, e.target.value)}
                    value={app.status}
                    className="border rounded py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                  </select>
                  {
                    app.applicationStatus === 'Pending' || app.applicationStatus === 'processing' ? <button
                      onClick={() => cancelApplication(app._id)}
                      className="bg-red-600 text-white p-1 rounded hover:bg-red-700"
                    >
                      <MdOutlineCancel className="w-4 h-4" />

                    </button>:null
                  }
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
            <p><strong>Applicant:</strong> {selectedApp.userName}</p>
            <p><strong>Email:</strong> {selectedApp.userEmail}</p>
            <p><strong>University:</strong> {selectedApp.universityName}</p>
            <p><strong>Subject:</strong> {selectedApp.subjectCategory}</p>
            <p><strong>Scholarship:</strong> {selectedApp.scholarshipCategory}</p>
            <p><strong>Fees:</strong> ${parseInt(selectedApp.applicationFees) + parseInt(selectedApp.serviceCharge)}</p>
            <p><strong>Status:</strong> {selectedApp.applicationStatus}</p>
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