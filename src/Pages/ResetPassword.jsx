import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrFormViewHide } from "react-icons/gr";
import { BiShowAlt } from "react-icons/bi";
import api from "../Services/api";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { id, token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/auth/reset-password/${id}/${token}`, {
        password,
      });
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      if (errorMessage.includes("expired")) {
        alert("The password reset link has expired. Please request a new link.");
      } else {
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-400 via-lime-500 to-teal-500 min-h-screen flex items-center justify-center">
      <div className="w-11/12 sm:w-3/4 lg:w-1/2 bg-white shadow-xl rounded-lg border-t-8 border-blue-400 overflow-hidden">
        <div className="p-8 sm:p-12">
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
            Reset Password
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Enter your new password below to reset your account.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-lg font-semibold text-blue-500 mb-1"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 shadow focus:ring focus:ring-blue-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
                >
                  {showPassword ? <BiShowAlt /> : <GrFormViewHide />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-lg py-3 rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Update Password
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-blue-500 hover:underline text-sm"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
