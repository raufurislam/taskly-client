import React from "react";
import { FcGoogle } from "react-icons/fc";

import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import useAuth from "../../hooks/useAuth";
// import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
  const axiosPublic = useAxiosPublic();
  const { googleSignIn, setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
        };
        // console.log(userInfo); // Check if the request is successful

        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data); // Check if the request is successful
        });

        setUser(result.user);
        toast.success("Google sign-in successful!");
        navigate(location?.state?.from || "/");
      })
      .catch((error) => {
        toast.error(error.message || "Google sign-in failed.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl text-center">
        <h1 className="text-gray-800 font-bold text-2xl">Welcome to Taskly</h1>
        <h2 className="text-gray-600 mt-1">
          A Modern task management Platform
        </h2>

        <button
          onClick={handleGoogleSignIn}
          className="btn mt-4 w-fit mx-auto flex gap-3 justify-center items-center"
        >
          <FcGoogle size={24} />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
