import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrFormViewHide } from "react-icons/gr";
import { BiShowAlt } from "react-icons/bi";
import api from "../Services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("adopter");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { name, email, password, role };
      const response = await api.post("/auth/register", payload);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
    setEmail("");
    setPassword("");
    setName("");
    setRole("adopter");
  };

  return (
    <div className="bg-gradient-to-r from-green-400 via-lime-500 to-teal-500 min-h-screen flex items-center justify-center">
      <div className="w-11/12 sm:w-3/4 lg:w-1/2 bg-white shadow-xl rounded-lg border-t-8 border-blue-400 overflow-hidden">
        <div className="p-8 sm:p-12">
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Sign Up</h1>
          <p className="text-center text-gray-600 mb-8">
            Join us and start your journey as an <span className="font-semibold">{role}</span>.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
        
            <div className="relative">
              <label
                htmlFor="name"
                className="block text-lg font-semibold text-blue-500 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg p-3 shadow focus:ring focus:ring-blue-300"
              />
            </div>

     
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-lg font-semibold text-blue-500 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg p-3 shadow focus:ring focus:ring-blue-300"
              />
            </div>

       
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-lg font-semibold text-blue-500 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 shadow pr-12 focus:ring focus:ring-blue-300"
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

    
            <div className="relative">
              <label
                htmlFor="role"
                className="block text-lg font-semibold text-blue-500 mb-1"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg p-3 shadow focus:ring focus:ring-blue-300"
              >
                <option value="adopter">Adopter</option>
                <option value="foster">Foster</option>
              </select>
            </div>

        
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-lg py-3 rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Register
              </button>
            </div>
            <p className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 underline hover:text-blue-700"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
