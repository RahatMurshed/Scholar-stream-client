import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline, MdOutlineReviews, MdPayment } from "react-icons/md";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Button from '../../../../Components/Button'
import { Link } from "react-router";
import Swal from "sweetalert2";


const MyApplications = () => {

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: applicationsData = [], refetch } = useQuery({
    queryKey: ['applicationData', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-applications?email=${user.email}`);
      console.log(res.data);
      return res.data;
    }
  })

  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false)
  const [showReview, setShowReview] = useState(false);
  const [review, setReview] = useState({ rating: 0, comment: "" });

  const handlePayment = async (app) => {
    const totalAmount = parseInt(app.applicationFees) + parseInt(app.serviceCharge);
    console.log(totalAmount)

    const paymentInfo = {
      price: totalAmount,
      id: app.scholarshipId,
      customerEmail: user.email,
      scholarshipName: app.scholarshipName

    }

    const res = await axiosSecure.post('/checkout', paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  }

  const openDetails = (app) => {
    setSelectedApp(app);
    setShowDetails(true);
  };

  const openReview = (app) => {
    setSelectedApp(app);
    setShowReview(true);
  };

  const handleReview = () => {
    console.log("Review submitted:", review);
    setShowReview(false);

  };

  const openEdit = (app) => {
    setSelectedApp(app);
    setShowEdit(true);
  }

  const handleEdit = (e) => {
    e.preventDefault();
    const updatedData = {
      userName: e.target.username.value,
      userEmail: e.target.useremail.value,
      contact: e.target.contact.value,
    }

    axiosSecure.patch(`/application/${selectedApp._id}`, updatedData)
      .then(res => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          Swal.fire({
            title: "Updated!",
            text: "Your info has been updated.",
            icon: "success"
          });
          refetch();
        }
      })

    setShowEdit(false);
  }

  const handleDelete = (app) => {


    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axiosSecure.delete(`/application/${app._id}`)
          .then(res => {
            console.log(res.data);
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your application has been deleted.",
                icon: "success"
              });
              refetch();
            }
          })
      }
    });
  }


  return (
    <div className="max-w-8xl mx-auto">
      <h1 className="text-3xl font-serif font-bold text-[#102347] mb-8">
        My Applications
      </h1>

      {/* Applications Table */}
      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#102347] text-white">
            <tr>
              <th className="px-4 py-3">Scholarship Name</th>
              <th className="px-4 py-3">User Name</th>
              <th className="px-4 py-3">Contact</th>

              <th className="px-4 py-3">Feedback</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Fees</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Payment Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicationsData.map((app) => (
              <tr key={app._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{app.scholarshipName}</td>
                <td className="px-4 py-3">{app.userName}</td>
                <td className="px-4 py-3">{app.contact || "Not Available"}</td>

                <td className="px-4 py-3">{app.feedback}</td>
                <td className="px-4 py-3">{app.subjectCategory}</td>
                <td className="px-4 py-3">${parseInt(app.applicationFees) + parseInt(app.serviceCharge)}</td>
                <td className="px-4 py-3 capitalize">{app.applicationStatus}</td>
                <td className="px-4 py-3 capitalize">{app.paymentStatus}</td>
                <td className="px-4 py-3 space-x-2 space-y-2">
                  {/* Details */}
                  <button
                    onClick={() => openDetails(app)}
                    className="bg-blue-600 text-white text-[12px] p-1 rounded hover:bg-blue-700 font-semibold"
                  >
                    <CgDetailsMore className="w-4 h-4" />

                  </button>

                  {/* Edit (pending only) */}
                  {app.applicationStatus === "Pending" && (
                    <button
                      onClick={() => { openEdit(app) }}
                      className="bg-purple-600 text-white p-1 rounded text-[12px] hover:bg-purple-800 font-semibold">
                      <FaEdit className="w-4 h-4" />

                    </button>
                  )}

                  {/* Pay (pending + unpaid) */}
                  {app.applicationStatus === "Pending" &&
                    app.paymentStatus === "Unpaid" && (
                      <button
                        onClick={() => { handlePayment(app) }}
                        className="bg-green-600 text-white p-1 rounded text-[12px]  hover:bg-green-700 font-semibold">
                        <MdPayment className="w-4 h-4" />

                      </button>
                    )}

                  {/* Delete (pending only) */}
                  {app.applicationStatus === "Pending" && (
                    <button
                      onClick={() => { handleDelete(app) }}
                      className="bg-red-600 text-white text-[12px] p-1 rounded hover:bg-red-700 font-semibold">
                      <MdDeleteOutline className="w-4 h-4" />

                    </button>
                  )}

                  {/* Add Review (completed only) */}
                  {app.applicationStatus === "Completed" && (
                    <button
                      onClick={() => openReview(app)}
                      className="bg-purple-600 text-white p-1 rounded hover:bg-purple-700"
                    >
                      <MdOutlineReviews className="h-4 w-5" />
                    </button>
                  )}
                </td>

              </tr>



            ))}
            {applicationsData.length === 0 && (
              <tr>
                <td
                  colSpan="9"
                  className="text-center text-gray-500 py-6 font-medium"
                >
                  <p>No application available for the user.</p>
                  <Link to='/all-scholarships'><Button label="Browse Scholarship" className="mt-3"></Button></Link>
                </td>

              </tr>
            )}
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

            <p><strong>University:</strong> {selectedApp.universityName}</p>
            <p><strong>Subject:</strong> {selectedApp.subjectCategory}</p>
            <p><strong>Fees:</strong> ${selectedApp.applicationFees}</p>
            <p><strong>Status:</strong> {selectedApp.applicationStatus}</p>
            <p><strong>Feedback:</strong> {selectedApp.feedback}</p>
            <p><strong>Application Date:</strong> {selectedApp.applicationDate}</p>
            <p><strong>Transection Id:</strong> {selectedApp.transectionId || "Not Available"}</p>
            <p><strong>Transection Id:</strong> {selectedApp.contact || "Not Available"}</p>
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


      {/* Edit Modal */}
      {showEdit && selectedApp && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold text-[#102347] mb-4">
              Edit Application
            </h2>
            <form
              onSubmit={handleEdit}
              className="space-y-4">
              {/* Scholarship Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  name="username"
                  defaultValue={selectedApp.userName}
                  className="mt-1 block w-full border rounded px-3 py-2"
                />
              </div>

              {/* University Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  User Email
                </label>
                <input
                  type="text"
                  name="useremail"
                  defaultValue={selectedApp.userEmail}
                  className="mt-1 block w-full border rounded px-3 py-2"
                />
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact
                </label>
                <input
                  type="text"
                  name="contact"
                  className="mt-1 block w-full border rounded px-3 py-2"
                />
              </div>

              {/* Buttons */}
              <div className="text-right mt-4 space-x-2">
                <button
                  type="submit"
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
            </form>
          </div>
        </div>
      )}


      {/* Review Modal */}
      {showReview && selectedApp && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold text-[#102347] mb-4">
              Add Review for {selectedApp.universityName}
            </h2>
            <div className="space-y-4">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={review.rating}
                  onChange={(e) =>
                    setReview({ ...review, rating: e.target.value })
                  }
                  className="mt-1 block w-full border rounded px-3 py-2"
                />
              </div>
              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Comment
                </label>
                <textarea
                  value={review.comment}
                  onChange={(e) =>
                    setReview({ ...review, comment: e.target.value })
                  }
                  className="mt-1 block w-full border rounded px-3 py-2"
                  rows="4"
                />
              </div>
              {/* Submit */}
              <div className="flex items-center space-x-3 ">
                <button
                  onClick={handleReview}
                  className="bg-[#102347] text-white px-4 py-2 rounded hover:bg-[#23365c]"
                >
                  Submit Review
                </button>
                <button
                  onClick={() => { setShowReview(false) }}
                  className="btn btn-outline">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;