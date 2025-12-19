import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";

import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";




const ManageScholarships = () => {
    const axiosSecure = useAxiosSecure();



    const { data: scholarship = [], refetch } = useQuery({
        queryKey: ['scholarships'],
        queryFn: async () => {
            const res = await axiosSecure.get('/scholarships')
            return res.data;
        }
    })


    const [scholarships, setScholarships] = useState(scholarship);
    const [selectedScholarship, setSelectedScholarship] = useState(null);
    const [showEdit, setShowEdit] = useState(false);

    const handleDelete = (id) => {
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


                axiosSecure.delete(`/scholarship/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount) {
                            Swal.fire({
                              title: "Deleted!",
                              text: "Your scholarship has been deleted.",
                              icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });


    };

    const openEdit = (scholarship) => {
        setSelectedScholarship(scholarship);
        setShowEdit(true);
    };

    const handleEdit = () => {
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

                            <th className="px-4 py-3">City</th>
                            <th className="px-4 py-3">Subject Category</th>
                            <th className="px-4 py-3">Degree</th>
                            <th className="px-4 py-3">Fees</th>
                            <th className="px-4 py-3">Deadline</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scholarship.map((s) => (
                            <tr key={s.id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-3">{s.scholarshipName}</td>
                                <td className="px-4 py-3">{s.universityName}</td>

                                <td className="px-4 py-3">{s.universityCity}</td>
                                <td className="px-4 py-3">{s.subjectCategory}</td>
                                <td className="px-4 py-3">{s.scholarshipLevel}</td>
                                <td className="px-4 py-3">${s.applicationFees}</td>
                                <td className="px-4 py-3">{s.applicationDeadline}</td>
                                <td className="px-4 py-3 space-x-1 flex">
                                    <button
                                        onClick={() => openEdit(s)}
                                        className="bg-yellow-500 text-white btn btn-sm px-1 text-[10px] rounded hover:bg-yellow-600"
                                    >
                                        <FaEdit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(s._id)}
                                        className="bg-red-600 text-white p-1 rounded hover:bg-red-700"
                                    >
                                        <MdDelete className="w-4 h-4" />

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
                                    onClick={() => { handleEdit(s._id) }}
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