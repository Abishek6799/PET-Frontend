import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../Services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/forgot-password", { email });
      toast.success(response.data.message);
      setError(null);
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    }
    setEmail("");
  };

  return (
    <div className="bg-gradient-to-r from-green-400 via-lime-500 to-teal-500 min-h-screen flex items-center justify-center">
      <div className="w-11/12 sm:w-3/4 lg:w-1/2 bg-white shadow-xl rounded-lg border-t-8 border-blue-400 overflow-hidden">
        <div className="p-8 sm:p-12">
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
            Forgot Password
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Enter your registered email address below, and we’ll send you instructions to reset your password.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-lg font-semibold text-blue-500 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg p-3 shadow focus:ring focus:ring-blue-300"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-lg py-3 rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Send Reset Link
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

export default ForgotPassword;
