import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddScholarship = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const axiosSecure = useAxiosSecure();


    const handleScholarshipData = (data) => {
        // console.log("Scholarship submitted:", data);

        axiosSecure.post('/scholarships', data)
            .then(res => {
                // console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Scholarship has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    reset();
                }
            })



        
    };

    return (
        <div className="max-w-5xl mx-auto space-y-10">
            {/* Header */}
            <h1 className="text-3xl font-serif font-bold text-[#102347]">
                Add Scholarship
            </h1>

            {/* Form */}
            <form
                onSubmit={handleSubmit(handleScholarshipData)}
                className="bg-white shadow-lg rounded-xl p-8 space-y-6"
            >
                {/* Scholarship Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Scholarship Name
                    </label>
                    <input
                        type="text"
                        {...register("scholarshipName", { required: true })}
                        className="mt-1 block w-full border rounded px-3 py-2"
                    />
                    {errors.scholarshipName && (
                        <p className="text-red-500 text-sm">This field is required</p>
                    )}
                </div>

                {/* University Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        University Name
                    </label>
                    <input
                        type="text"
                        {...register("universityName", { required: true })}
                        className="mt-1 block w-full border rounded px-3 py-2"
                    />
                    {errors.universityName && (
                        <p className="text-red-500 text-sm">This field is required</p>
                    )}
                </div>

                {/* Image */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Image URL
                    </label>
                    <input
                        type="text"
                        {...register("image")}
                        className="mt-1 block w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Country & City */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Country
                        </label>
                        <input
                            type="text"
                            {...register("country", { required: true })}
                            className="mt-1 block w-full border rounded px-3 py-2"
                        />
                        {errors.country && (
                            <p className="text-red-500 text-sm">This field is required</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            City
                        </label>
                        <input
                            type="text"
                            {...register("city", { required: true })}
                            className="mt-1 block w-full border rounded px-3 py-2"
                        />
                        {errors.city && (
                            <p className="text-red-500 text-sm">This field is required</p>
                        )}
                    </div>
                </div>

                {/* World Rank */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        World Rank
                    </label>
                    <input
                        type="number"
                        {...register("worldRank")}
                        className="mt-1 block w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Subject Category & Scholarship Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Subject Category
                        </label>
                        <input
                            type="text"
                            {...register("subjectCategory", { required: true })}
                            className="mt-1 block w-full border rounded px-3 py-2"
                        />
                        {errors.subjectCategory && (
                            <p className="text-red-500 text-sm">This field is required</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Scholarship Category
                        </label>
                        <input
                            type="text"
                            {...register("scholarshipCategory", { required: true })}
                            className="mt-1 block w-full border rounded px-3 py-2"
                        />
                        {errors.scholarshipCategory && (
                            <p className="text-red-500 text-sm">This field is required</p>
                        )}
                    </div>
                </div>

                {/* Degree */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Degree
                    </label>
                    <input
                        type="text"
                        {...register("degree", { required: true })}
                        className="mt-1 block w-full border rounded px-3 py-2"
                    />
                    {errors.degree && (
                        <p className="text-red-500 text-sm">This field is required</p>
                    )}
                </div>

                {/* Tuition Fees, Application Fees, Service Charge */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Tuition Fees (optional)
                        </label>
                        <input
                            type="number"
                            {...register("tuitionFees")}
                            className="mt-1 block w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Application Fees
                        </label>
                        <input
                            type="number"
                            {...register("applicationFees", { required: true })}
                            className="mt-1 block w-full border rounded px-3 py-2"
                        />
                        {errors.applicationFees && (
                            <p className="text-red-500 text-sm">This field is required</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Service Charge
                        </label>
                        <input
                            type="number"
                            {...register("serviceCharge", { required: true })}
                            className="mt-1 block w-full border rounded px-3 py-2"
                        />
                        {errors.serviceCharge && (
                            <p className="text-red-500 text-sm">This field is required</p>
                        )}
                    </div>
                </div>

                {/* Deadline & Post Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Deadline
                        </label>
                        <input
                            type="date"
                            {...register("deadline", { required: true })}
                            className="mt-1 block w-full border rounded px-3 py-2"
                        />
                        {errors.deadline && (
                            <p className="text-red-500 text-sm">This field is required</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Post Date
                        </label>
                        <input
                            type="date"
                            {...register("postDate", { required: true })}
                            className="mt-1 block w-full border rounded px-3 py-2"
                        />
                        {errors.postDate && (
                            <p className="text-red-500 text-sm">This field is required</p>
                        )}
                    </div>
                </div>

                {/* User Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        User Email
                    </label>
                    <input
                        type="email"
                        {...register("userEmail", { required: true })}
                        className="mt-1 block w-full border rounded px-3 py-2"
                    />
                    {errors.userEmail && (
                        <p className="text-red-500 text-sm">This field is required</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="text-right">
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-[#102347] to-[#23365c] text-white px-6 py-2 rounded-lg font-semibold shadow hover:scale-105 transition"
                    >
                        Add Scholarship
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddScholarship;