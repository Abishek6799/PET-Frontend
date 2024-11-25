import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../Services/api";

const CreatePetProfile = () => {
  const [name, setName] = useState("");
  const [petname, setPetname] = useState("")
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [size, setSize] = useState("Small");
  const [color, setColor] = useState("");
  const [gender, setGender] = useState("Male");
  const [location, setLocation] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("available");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !petname || !age || !breed || !size || !color || !gender || !location || !description || !medicalHistory || !status || !image) {
      setError("All fields are required");
      return;
    }
    const shelterId = localStorage.getItem("shelterId");
    if (!shelterId) {
      toast.error("Please login first");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("petname",petname);
    formData.append("age", age);
    formData.append("breed", breed);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("medicalHistory", medicalHistory);
    formData.append("status", status);
    formData.append("gender", gender);
    formData.append("location", location);
    formData.append("description", description);

    if (image) formData.append("image", image);
    formData.append("shelterId", shelterId);

    try {
      const response = await api.post("/pet/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success(response.data.message);
      navigate("/shelter");
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-teal-500 to-blue-500 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">Create Pet Profile</h1>
        {error && <div className="bg-red-100 p-3 mb-4 text-red-600 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-600">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Dog"
                required
                className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="petname" className="block text-sm font-semibold text-gray-600">Pet Name</label>
              <input
                type="text"
                id="petname"
                name="petname"
                placeholder="Bella"
                required
                className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={petname}
                onChange={(e) => setPetname(e.target.value)}
              />
            </div>
            
    
            <div>
              <label htmlFor="age" className="block text-sm font-semibold text-gray-600">Age</label>
              <input
                type="text"
                id="age"
                name="age"
                placeholder="2 years"
                required
                className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
        
            <div>
              <label htmlFor="breed" className="block text-sm font-semibold text-gray-600">Breed</label>
              <input
                type="text"
                id="breed"
                name="breed"
                placeholder="Holland Lop"
                required
                className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              />
            </div>
        
            <div>
              <label htmlFor="size" className="block text-sm font-semibold text-gray-600">Size</label>
              <select 
                id="size"
                name="size"
                className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
     
            <div>
              <label htmlFor="color" className="block text-sm font-semibold text-gray-600">Color</label>
              <input
                type="text"
                id="color"
                name="color"
                placeholder="Enter color"
                required
                className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
      
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-600">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Enter location"
                className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
         
            
   
            <div>
              <label htmlFor="image" className="block text-sm font-semibold text-gray-600">Image</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>
     
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="gender" className="block text-sm font-semibold text-gray-600">Gender</label>
              <select 
                id="gender"
                name="gender"
                className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-semibold text-gray-600">Status</label>
              <select
                id="status"
                name="status"
                required
                className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="available">Available</option>
                <option value="fostered">Fostered</option>
              </select>
            </div>
          </div>
          
      
          <div>
            <label htmlFor="medicalHistory" className="block text-sm font-semibold text-gray-600">Medical History</label>
            <textarea
            type="text"
              id="medicalHistory"
              name="medicalHistory"
              placeholder="Enter pet medical history"
              className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows="4"
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
            ></textarea>
          </div>
      
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-600">Description</label>
            <textarea
            type="text"
              id="description"
              name="description"
              placeholder="Enter pet description"
              className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 bg-teal-600 text-white font-bold rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
            >
              Register Pet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePetProfile;
