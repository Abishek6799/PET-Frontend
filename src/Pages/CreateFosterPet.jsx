import React, { useState } from "react";
import api from "../Services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const CreateFosterPet = () => {
    const { petId, shelterId } = useParams();
    const [formData, setFormData] = useState({
        petId: petId,
        shelterId: shelterId,
        name: "",
        address: "",
        phoneNumber: "",
        email: "",
        location: "",
        availability: "",
        description: "",
        startDate: "",
        endDate: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        if (
            !formData.name ||
            !formData.address ||
            !formData.availability ||
            !formData.email ||
            !formData.location ||
            !formData.phoneNumber ||
            !formData.description
        ) {
            setError("Please fill in all the required fields.");
            setLoading(false);
            return;
        }

        try {
            const response = await api.post(`/foster/fosterpet/${petId}/${shelterId}`, formData);

            if (response.status === 201) {
                toast.success(response.data.message);
                setMessage(response.data.message);
                setFormData({
                    petId: petId,
                    shelterId: shelterId,
                    name: "",
                    address: "",
                    phoneNumber: "",
                    email: "",
                    location: "",
                    availability: "",
                    description: "",
                    startDate: "",
                    endDate: "",
                });
                navigate(`/foster-details`);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

 
    const getCurrentDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 via-teal-500 to-blue-500 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl p-8">
                <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">Create Foster Pet Profile</h1>
                {error && <div className="bg-red-100 p-3 mb-4 text-red-600 rounded">{error}</div>}
                {message && <div className="bg-green-100 p-3 mb-4 text-green-600 rounded">{message}</div>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-600">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter pet name"
                                required
                                className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                  
                        <div>
                            <label htmlFor="location" className="block text-sm font-semibold text-gray-600">Location</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                placeholder="Enter location"
                                required
                                className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </div>

                  
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-600">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter email"
                                required
                                className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                 
                        <div>
                            <label htmlFor="address" className="block text-sm font-semibold text-gray-600">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Enter address"
                                required
                                className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>

                    
                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-600">Phone Number</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder="Enter phone number"
                                required
                                className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>

                
                        <div>
                            <label htmlFor="availability" className="block text-sm font-semibold text-gray-600">Availability</label>
                            <input
                                type="text"
                                id="availability"
                                name="availability"
                                placeholder="Enter availability"
                                className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={formData.availability}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

              
                    <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-600">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Enter description"
                            required
                            className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                        <div>
                            <label htmlFor="startDate" className="block text-sm font-semibold text-gray-600">Start Date</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={formData.startDate}
                                min={getCurrentDate()}
                                onChange={handleChange}
                            />
                        </div>

                 
                        <div>
                            <label htmlFor="endDate" className="block text-sm font-semibold text-gray-600">End Date</label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={formData.endDate}
                                min={formData.startDate || getCurrentDate()}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className={`py-4 px-6 bg-teal-600 text-white font-bold rounded-lg shadow-md hover:bg-teal-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateFosterPet;