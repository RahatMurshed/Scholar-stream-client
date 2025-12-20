import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";

import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";




const ManageScholarships = () => {
    const axiosSecure = useAxiosSecure();



    const { data: scholarships = [], refetch } = useQuery({
        queryKey: ['scholarships'],
        queryFn: async () => {
            const res = await axiosSecure.get('/scholarships')
            return res.data;
        }
    })


    // const [selectedScholarship, setSelectedScholarship] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedScholarship, setSelectedScholarship] = useState({});
    // console.log(selectedScholarship)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

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
                        // console.log(res.data);
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



    const handleEdit = (data) => {
        // console.log(data);
        axiosSecure.patch(`/scholarship/${selectedScholarship._id}`, data)
            .then(res => {
                // console.log(res.data);
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Scholarship has been updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                    setShowModal(false);
                }
            })

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
                        {scholarships.map((s) => (
                            <tr key={s._id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-3">{s.scholarshipName}</td>
                                <td className="px-4 py-3">{s.universityName}</td>

                                <td className="px-4 py-3">{s.universityCity}</td>
                                <td className="px-4 py-3">{s.subjectCategory}</td>
                                <td className="px-4 py-3">{s.scholarshipLevel}</td>
                                <td className="px-4 py-3">${s.applicationFees}</td>
                                <td className="px-4 py-3">{s.applicationDeadline}</td>
                                <td className="px-4 py-3 space-x-1 flex">
                                    <button
                                        onClick={() => {
                                            setSelectedScholarship(s);

                                            setShowModal(true);
                                        }}
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
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
                        <h2 className="text-xl font-bold text-[#102347] mb-4">Edit Scholarship</h2>

                        <form onSubmit={handleSubmit(handleEdit)} className="space-y-4">
                            {/* Scholarship Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Scholarship Name</label>
                                <input
                                    type="text"
                                    value={selectedScholarship.scholarshipName}
                                    {...register("scholarshipName", { required: true })}
                                    className="mt-1 block w-full border rounded px-3 py-2"
                                />
                                {errors.scholarshipName && <p className="text-red-500 text-sm">Required</p>}
                            </div>

                            {/* University Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">University Name</label>
                                <input
                                    type="text"
                                    defaultValue={selectedScholarship.universityName}
                                    {...register("universityName", { required: true })}
                                    className="mt-1 block w-full border rounded px-3 py-2"
                                />
                            </div>

                            {/* Subject Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Subject Category</label>
                                <input
                                    type="text"
                                    defaultValue={selectedScholarship.subjectCategory}
                                    {...register("subjectCategory")}
                                    className="mt-1 block w-full border rounded px-3 py-2"
                                />
                            </div>

                            {/* Scholarship Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Scholarship Category</label>
                                <input
                                    type="text"
                                    defaultValue={selectedScholarship.scholarshipCategory}
                                    {...register("scholarshipCategory")}
                                    className="mt-1 block w-full border rounded px-3 py-2"
                                />
                            </div>

                            {/* Degree */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Degree</label>
                                <input
                                    type="text"
                                    defaultValue={selectedScholarship.scholarshipLevel}
                                    {...register("scholarshipLevel")}
                                    className="mt-1 block w-full border rounded px-3 py-2"
                                />
                            </div>

                            {/* Tuition Fees, Application Fees, Service Charge */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tuition Fees</label>
                                    <input
                                        type="number"
                                        defaultValue={selectedScholarship.tuitionFees}
                                        {...register("tuitionFees")}
                                        className="mt-1 block w-full border rounded px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Application Fees</label>
                                    <input
                                        type="number"
                                        defaultValue={selectedScholarship.applicationFees}
                                        {...register("applicationFees")}
                                        className="mt-1 block w-full border rounded px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Service Charge</label>
                                    <input
                                        type="number"
                                        defaultValue={selectedScholarship.serviceCharge}
                                        {...register("serviceCharge")}
                                        className="mt-1 block w-full border rounded px-3 py-2"
                                    />
                                </div>
                            </div>

                            {/* Deadline */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Application Deadline</label>
                                <input
                                    type="date"
                                    defaultValue={selectedScholarship.applicationDeadline}
                                    {...register("applicationDeadline")}
                                    className="mt-1 block w-full border rounded px-3 py-2"
                                />
                            </div>

                            {/* Scholarship Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Scholarship Status</label>
                                <select
                                    {...register("scholarshipStatus")}
                                    className="mt-1 block w-full border rounded px-3 py-2"
                                >
                                    <option value="Open">Open</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </div>

                            {/* Save / Cancel */}
                            <div className="text-right mt-4 space-x-2">
                                <button
                                    type="submit"
                                    className="bg-[#102347] text-white px-4 py-2 rounded hover:bg-[#23365c]"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-300 text-[#102347] px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>



            )}
        </div>
    );
};

export default ManageScholarships;