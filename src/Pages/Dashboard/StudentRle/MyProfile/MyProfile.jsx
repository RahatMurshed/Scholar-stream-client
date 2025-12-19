import { Link } from "react-router";
import useAuth from "../../../../Hooks/useAuth";


const MyProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <h1 className="text-3xl font-serif font-bold text-[#102347]">
        My Profile
      </h1>

      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-emerald-500 object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#102347]">
              {user?.displayName || "Your Name"}
            </h2>
            <p className="text-gray-600">{user?.email || "your@email.com"}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-semibold text-[#102347]">
                {user?.role || "Student"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Joined</p>
              <p className="font-semibold text-[#102347]">
                {user?.createdAt || "December 2025"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          {/* <div className="flex gap-4 mt-6">
            <button className="bg-gradient-to-r from-[#102347] to-[#23365c] text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition">
              Edit Profile
            </button>
            <button className="bg-gray-200 text-[#102347] px-6 py-2 rounded-full font-semibold shadow hover:bg-gray-300 transition">
              Change Password
            </button>
          </div> */}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500">Applications Submitted</p>
          <p className="text-2xl font-bold text-[#102347]">0</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500">Scholarships Won</p>
          <p className="text-2xl font-bold text-[#102347]">0</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500">Reviews Written</p>
          <p className="text-2xl font-bold text-[#102347]">0</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-serif font-bold text-[#102347] mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <Link to='/all-scholarships' className="bg-gradient-to-r from-[#102347] to-[#23365c] text-white px-6 py-2 rounded-lg font-semibold shadow hover:scale-105 transition">
            Browse Scholarships
          </Link>
         
          <Link to='/dashboard/my-applications' className="bg-gradient-to-r from-[#102347] to-[#23365c] text-white px-6 py-2 rounded-lg font-semibold shadow hover:scale-105 transition">
            Write a Review
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

      {/* Scholarship Spotlight */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-serif font-bold text-[#102347] mb-4">
          Scholarship Spotlight
        </h2>
        <div className="flex items-center gap-4">
          <img
            src="https://thumbs.dreamstime.com/b/panoramic-view-oxford-18292683.jpg"
            alt="Oxford"
            className="w-32 h-20 object-cover rounded-lg"
          />
          <div>
            <p className="font-semibold text-[#102347]">
              Global Excellence Scholarship
            </p>
            <p className="text-sm text-gray-600">University of Oxford</p>
            <button className="mt-2 text-sm bg-gradient-to-r from-[#102347] to-[#23365c] text-white px-4 py-1 rounded-lg shadow hover:scale-105 transition">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;