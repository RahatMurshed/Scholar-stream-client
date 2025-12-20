import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../Components/Button";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";

const Login = () => {

  const {googleLogin, setUser, login} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    // console.log("Login Submitted:", data);
    login(data.email, data.password)
    .then(result=>{
      const loggedUser = result.user;
      // console.log(loggedUser);
      setUser(loggedUser);
       navigate(location.state || '/')
    })
    .catch(error=>{
      console.log(error.message);
      setLoginError(error.message);
    })
    
  };


   const handleGoogleLogin = ()=>{

    googleLogin()
    .then(result=>{
      const loggedUser = result.user;
      // console.log(loggedUser);
      setUser(loggedUser);
       navigate(location.state || '/');
    })
    .catch(error=>{
      console.log(error.message);
    })


  }

  // console.log(location.state)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-xl rounded-2xl overflow-hidden">
        
        {/* Left: Info / Branding */}
        <div className="bg-[#102347] text-white flex flex-col justify-center p-8">
          <h1 className="text-3xl font-serif font-bold mb-4">Welcome Back to ScholarStream</h1>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Log in to continue your scholarship journey. Access saved applications, 
            personalized recommendations, and recruiter-ready tools.
          </p>
          <ul className="space-y-3 text-gray-200 text-sm">
            <li>✔ Track your scholarship applications</li>
            <li>✔ Get personalized scholarship alerts</li>
            <li>✔ Build your academic profile</li>
          </ul>
        </div>

        {/* Right: Login Form */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-[#102347] mb-6 text-center">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
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

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#102347] mb-1">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none focus:border-none"
              />
              {errors.password && <p className="text-red-500 text-sm m-1 font-semibold">{errors.password.message}</p>}
              {loginError && <p className="text-sm m-1 text-red-500 font-semibold">{loginError}</p>}
            </div>
             <p className="text-sm ">
              <Link className="text-emerald-500 hover:underline">
                Forgot your password?
              </Link>
            </p>

            {/* Login Button */}
            <Button label="Login" variant="primary" className="w-full cursor-pointer" />
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
            className="w-full flex items-center cursor-pointer justify-center gap-2 px-4 py-2 rounded-full font-semibold text-sm 
            border border-gray-300 shadow-sm bg-white hover:bg-gray-50 transition-all duration-300 ease-in-out"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google Logo"
              className="w-5 h-5"
            />
            <span className="text-[#102347]">Continue with Google</span>
          </button>

          {/* Extra Links */}
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to='/register' state={location.state}  className="text-emerald-500 hover:underline">
                Register here
              </Link>
            </p>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;