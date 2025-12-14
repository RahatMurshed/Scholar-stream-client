import { useForm } from "react-hook-form";
import Button from "../../../Components/Button";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";


const RegisterPage = () => {
const {googleLogin, setUser, registerUser,updateUserProfile, user} = useAuth();
const [isError, setIsError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    console.log("Form Submitted:", data);
    registerUser(data.email, data.password)
    .then(result=>{
      const createdUser = result.user;
      console.log(createdUser);
      setUser(createdUser);
      // Update user profile with name and photo URL
      updateUserProfile({
        displayName: data.name,
        photoURL: data.photoUrl
      })
      .then(()=>{
        console.log("User profile updated successfully");
      })
      .catch(error=>{
        console.log("Error updating user profile:", error.message);
      })})
    .catch(error=>{
      console.log("Error registering user:", error.message);
      setIsError(error.message);

    })
  };

  console.log(user)

  const handleGoogleLogin = ()=>{

    googleLogin()
    .then(result=>{
      const loggedUser = result.user;
      console.log(loggedUser);
      setUser(loggedUser);
    })
    .catch(error=>{
      console.log(error.message);
      setIsError(error.message);
    })


  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-xl rounded-2xl overflow-hidden">
        
        {/* Left: Info / Branding */}
        <div className="bg-[#102347] text-white flex flex-col justify-center p-8">
          <h1 className="text-3xl font-serif font-bold mb-4">Join ScholarStream</h1>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Unlock access to thousands of scholarships tailored to your profile. 
            ScholarStream helps students discover opportunities, track applications, 
            and build a recruiter-ready academic journey.
          </p>
          <ul className="space-y-3 text-gray-200 text-sm">
            <li>✔ Personalized scholarship recommendations</li>
            <li>✔ Easy application tracking</li>
            <li>✔ Premium recruiter-ready profile</li>
          </ul>
        </div>

        {/* Right: Register Form */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-[#102347] mb-6 text-center">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[#102347] mb-1">Full Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none focus:border-none"
              />
              {errors.name && <p className="text-red-500 text-sm m-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#102347] mb-1">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none focus:border-none"
              />
              {errors.email && <p className="text-red-500 text-sm m-1">{errors.email.message}</p>}
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-medium text-[#102347] mb-1">Photo URL</label>
              <input
                type="text"
                {...register("photoUrl", { required: "Photo URL is required" })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none focus:border-none"
              />
              {errors.photoUrl && <p className="text-red-500 text-sm m-1">{errors.photoUrl.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#102347] mb-1">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                  validate: {
                    hasUpperCase: (value) =>
                      /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
                    hasSpecialChar: (value) =>
                      /[!@#$%^&*(),.?\":{}|<>]/.test(value) ||
                      "Password must contain at least one special character",
                  },
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none focus:border-none"
              />
              {errors.password && <p className="text-red-500 text-sm m-1">{errors.password.message}</p>}
            </div>

            {/* Register Button */}
            <Button label="Register" variant="primary" className="w-full cursor-pointer" />
            <p className="text-red-500 text-sm m-1">{isError}</p>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-2 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex cursor-pointer items-center justify-center gap-2 px-4 py-2 rounded-full font-semibold text-sm 
            border border-gray-300 shadow-sm bg-white hover:bg-gray-50 transition-all duration-300 ease-in-out"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google Logo"
              className="w-5 h-5"
            />
            <span className="text-[#102347]">Continue with Google</span>
          </button>
          <p className="text-center mt-2 text-sm">Already have an account? <Link to='/login' className="text-emerald-500 hover:underline ">Login here</Link></p>
        </div>
        
      </div>
    </div>
  );
};

export default RegisterPage;