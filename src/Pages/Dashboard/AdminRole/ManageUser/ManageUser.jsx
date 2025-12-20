import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";



const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })



    const [filterRole, setFilterRole] = useState("All");

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

                axiosSecure.delete(`/user/${id}`)
                    .then(res => {
                        // console.log(res.data)
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your user has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });


    };

    const handleRoleChange = (user, newRole) => {
        // console.log(newRole)
        // console.log(user)
        const updatedData = {
            role: newRole
        }
        Swal.fire({
            title: `You want to make ${user.displayName} as ${newRole}?`,
            text: `
            Changing a user's role as ${newRole} will affect their access rights. Please confirm before proceeding.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes. Change"
        }).then((result) => {
            if (result.isConfirmed) {


                axiosSecure.patch(`/user/${user._id}`, updatedData)
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                title: "Changed!",
                                text: `${user.displayName}'s role has been changed as ${newRole}`,
                                icon: "success"
                            });
                            refetch();
                        }
                    })


            }
        });
    };

    const filteredUsers =
        filterRole === "All"
            ? users
            : users.filter((u) => u.role === filterRole);

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-serif font-bold text-[#102347] mb-8">
                Manage Users
            </h1>

            {/* Filter Dropdown */}
            <div className="mb-6">
                <label className="mr-3 font-semibold text-[#102347]">Filter by Role:</label>
                <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="border rounded px-3 py-2"
                >
                    <option value="All">All</option>
                    <option value="Student">Student</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto bg-white shadow rounded-xl">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-[#102347] text-white">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-3">{user.displayName}</td>
                                <td className="px-4 py-3">{user.email}</td>
                                <td className="px-4 py-3">{user.role}</td>
                                <td className="px-4 py-3 space-x-2">
                                    {/* Change Role Dropdown */}
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user, e.target.value)}
                                        className="border rounded px-2 py-1"
                                    >
                                        <option value="Student">Student</option>
                                        <option value="Moderator">Moderator</option>
                                        <option value="Admin">Admin</option>
                                    </select>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredUsers.length === 0 && (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center text-gray-500 py-6 font-medium"
                                >
                                    No users found for this role.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
