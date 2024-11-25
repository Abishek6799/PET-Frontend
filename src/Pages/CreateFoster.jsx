import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../Services/api";


const CreateFoster = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!name || !email || !phoneNumber || !address || !description) {
      setError("All fields are required");
      toast.error("All fields are required");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("userId not found in localStorage");
      toast.error("Please log in first");
      return;
    }

    try {
  
      const payload = { name, email, phoneNumber, address, description, userId };


      const response = await api.post("/foster/create", payload);

 
      localStorage.setItem("role", "foster");
      toast.success(response.data.message);
      setError(null);


      navigate("/foster-details");


      setName("");
      setEmail("");
      setPhoneNumber("");
      setAddress("");
      setDescription("");

    } catch (error) {
      console.error("Error creating foster:", error);
      const errorMessage = error.response?.data?.message || "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div id="bgcolor">
      <div className="w-5/6 sm:w-4/5 lg:w-3/6 mx-auto border-black shadow-2xl mt-10 rounded-3xl bg-white relative">
        <h1 className="text-center text-2xl font-bold pt-5 text-rose-500">
          Fostering Form
        </h1>
        {error && (
          <div className="bg-red-100 p-3 mb-4 text-red-600 rounded">
            {error}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="container flex flex-col gap-8 px-10 md:px-16 lg:px-20 pt-5"
        >
     
          <p className="flex flex-wrap sm:flex-nowrap items-center gap-4">
            <label htmlFor="name" className="text-2xl w-1/3 text-blue-500">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Your Full Name"
              required
              className="border-2 border-black w-full sm:w-2/3 p-2 hover:rounded-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </p>

    
          <p className="flex flex-wrap sm:flex-nowrap items-center gap-4">
            <label htmlFor="email" className="text-2xl w-1/3 text-blue-500">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              required
              className="border-2 border-black w-full sm:w-2/3 hover:rounded-full p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </p>

          <p className="flex flex-wrap sm:flex-nowrap items-center gap-4">
            <label htmlFor="phoneNumber" className="text-2xl w-1/3 text-blue-500">
              Mobile Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              placeholder="Enter Your Mobile Number"
              required
              className="border-2 border-black w-full sm:w-2/3 p-2 hover:rounded-full"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </p>

    
          <p className="flex flex-wrap sm:flex-nowrap gap-4">
            <label htmlFor="address" className="text-2xl w-1/3 text-blue-500">
              Address
            </label>
            <textarea
              id="address"
              placeholder="Enter Your Address"
              required
              className="w-full sm:w-2/3 p-2 border-2 border-black hover:rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </p>

    
          <p className="flex flex-wrap sm:flex-nowrap gap-4">
            <label htmlFor="description" className="text-2xl w-1/3 text-blue-500">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter a Description"
              required
              className="w-full sm:w-2/3 p-2 border-2 border-black hover:rounded-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </p>

          <div className="mb-5">
            <button
              type="submit"
              className="bg-[#01ec64] text-black hover:text-white border border-black text-lg hover:bg-[#179b4e] transition-all duration-300 ease-in-out py-2 w-full hover:rounded-full"
            >
              Register
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFoster;
