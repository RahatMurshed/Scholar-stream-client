import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Components/Loader";


const AdminProfile = () => {
  const { user } = useAuth();
  // console.log(user)
  const axiosSecure = useAxiosSecure();

  const { data: scholarships = [] , isLoading} = useQuery({
    queryKey: ['scholarships'],
    queryFn: async () => {
      const res = axiosSecure.get('/scholarships')
      return (await res).data;
    }
  })

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = axiosSecure.get('/users')
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
  // console.log(totalFees)


  if(isLoading){
    return <Loader></Loader>
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <h1 className="text-3xl font-serif font-bold text-[#102347]">
        Admin Profile
      </h1>

      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="Admin"
            className="w-32 h-32 rounded-full border-4 border-emerald-500 object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#102347]">
              {user?.displayName || "Admin Name"}
            </h2>
            <p className="text-gray-600">{user?.email || "admin@email.com"}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-semibold text-[#102347]">
                {user?.role || "Admin"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Joined</p>
              <p className="font-semibold text-[#102347]">
                {user?.metadata.creationTime || "December 2025"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500">Total Scholarships</p>
          <p className="text-2xl font-bold text-[#102347]">{scholarships.length}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-bold text-[#102347]">{users.length}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500">Total Fees Collected</p>
          <p className="text-2xl font-bold text-[#102347]">${totalFees}</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-serif font-bold text-[#102347] mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/dashboard/add-scholarship"
            className="bg-gradient-to-r from-[#102347] to-[#23365c] text-white px-6 py-2 rounded-lg font-semibold shadow hover:scale-105 transition"
          >
            Add Scholarship
          </Link>

          <Link
            to="/dashboard/manage-scholarships"
            className="bg-gradient-to-r from-[#102347] to-[#23365c] text-white px-6 py-2 rounded-lg font-semibold shadow hover:scale-105 transition"
          >
            Manage Scholarships
          </Link>

          <Link
            to="/dashboard/manage-users"
            className="bg-gradient-to-r from-[#102347] to-[#23365c] text-white px-6 py-2 rounded-lg font-semibold shadow hover:scale-105 transition"
          >
            Manage Users
          </Link>

          <Link
            to="/dashboard/analytics"
            className="bg-gradient-to-r from-[#102347] to-[#23365c] text-white px-6 py-2 rounded-lg font-semibold shadow hover:scale-105 transition"
          >
            View Analytics
          </Link>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-serif font-bold text-[#102347] mb-4">
          Notifications
        </h2>
        <p className="text-gray-600">No new notifications at the moment.</p>
      </div>

      {/* Admin Spotlight */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-serif font-bold text-[#102347] mb-4">
          Admin Spotlight
        </h2>
        <div className="flex items-center gap-4">
          <img
            src="https://cdn.pixabay.com/photo/2017/01/20/00/30/university-1994693_1280.jpg"
            alt="University"
            className="w-32 h-20 object-cover rounded-lg"
          />
          <div>
            <p className="font-semibold text-[#102347]">
              Platform Overview
            </p>
            <p className="text-sm text-gray-600">
              Manage scholarships, users, and monitor analytics.
            </p>
            <Link
              to="/dashboard/analytics"
              className="mt-2 inline-block text-sm bg-gradient-to-r from-[#102347] to-[#23365c] text-white px-4 py-1 rounded-lg shadow hover:scale-105 transition"
            >
              Explore Analytics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;