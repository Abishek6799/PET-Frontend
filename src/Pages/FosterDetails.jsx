import React, { useEffect, useState } from "react";
import api from "../Services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MessageFromFoster from "../Components/MessageFromFoster";

const FosterDetails = () => {
    const [fosteredPets, setFosteredPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showMessageForm, setShowMessageForm] = useState(false);
    const [selectedFoster, setSelectedFoster] = useState(null);

    useEffect(() => {
        const fetchFosteredPets = async () => {
           
           
            try {
                const response = await api.get("/foster/get"); 
                setFosteredPets(response.data.fosters || []);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch fostered pets");
                toast.error("Failed to fetch fostered pets");
            } finally {
                setLoading(false);
            }
        };

        fetchFosteredPets();
    }, []);

    const handleSendMessage = (foster) => {
        setSelectedFoster(foster);
        setShowMessageForm(true);
    };

    const handleStatusChange = async (fosterId,status,fosterstatus) => {
        try {
           
            await api.put(`/foster/update/${fosterId}`, { status});
           

            setFosteredPets(prevPets =>
                prevPets.map(foster =>
                    foster._id === fosterId ? { ...foster, status } : foster
                )
            );
            toast.success(`Status updated to ${fosterstatus}`);
        } catch (err) {
            toast.error("Failed to update status");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-purple-400 via-pink-300 to-blue-300 animate-gradient">
                <div className="text-xl font-semibold text-white animate-pulse">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-400 to-yellow-200">
                <div className="text-xl text-red-800 font-semibold">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-bl from-indigo-400 via-purple-300 to-pink-200 p-8">
            <h1 className="text-center text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-red-500 to-purple-500 mb-12">
                Fostered Pets
            </h1>

            <div className="bg-white bg-opacity-90 shadow-2xl rounded-2xl p-8">
                {fosteredPets.length === 0 ? (
                    <p className="text-center text-gray-500">No fostered pets found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {fosteredPets.map((foster) => (
                            <div
                                key={foster._id}
                                className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="overflow-hidden rounded-t-2xl">
                                    <img
                                        src={foster.pet?.image || "/default-image.jpg"}
                                        alt={foster.pet?.name || "Pet"}
                                        onError={(e) => (e.target.src = "/default-image.jpg")}
                                        className="w-full h-48 object-cover"
                                    />
                                </div>
                                <div className="p-6 space-y-3">
                                    <h3 className="text-xl font-bold text-gray-800">
                                        {foster.pet?.name || "Unknown"}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        <strong>Breed:</strong> {foster.pet?.breed || "N/A"}
                                    </p>
                                    <p className="text-sm">
                                        <strong>Status:</strong>{" "}
                                        <span
                                            className={`px-3 py-1 inline-block rounded-full text-xs font-medium ${
                                                foster.status === "active"
                                                    ? "bg-blue-100 text-blue-700"
                                                : foster.status === "inactive"
                                                    ? "bg-orange-100 text-orange-700"
                                                : foster.status === "completed"
                                                    ? "bg-green-100 text-green-700"
                                                : "bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            {foster.status || "Pending"}
                                        </span>
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <strong>Start Date:</strong>{" "}
                                        {foster.startDate
                                            ? new Date(foster.startDate).toLocaleDateString()
                                            : "N/A"}
                                    </p>
                                    {foster.endDate && (
                                        <p className="text-sm text-gray-600">
                                            <strong>End Date:</strong>{" "}
                                            {new Date(foster.endDate).toLocaleDateString()}
                                        </p>
                                    )}
                                    <div className="flex space-x-2 mt-4">
                                        { ["active", "inactive", "completed"].includes(foster.status) &&  (
                                            <>
                                            <button
                                            onClick={() => handleStatusChange(foster._id, "active")}
                                            className="py-2 px-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
                                        >
                                            Active
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(foster._id, "inactive")}
                                            className="py-2 px-4 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600"
                                        >
                                            Inactive
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(foster._id, "completed")}
                                            className="py-2 px-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600"
                                        >
                                            Completed
                                        </button>
                                            </>
                                        )}
                                        
                                    </div>
                                    <button
                                        onClick={() => handleSendMessage(foster)}
                                        className="w-full py-2 px-4 mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
                                    >
                                        Message
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {showMessageForm && selectedFoster && (
                <MessageFromFoster
                    petId={selectedFoster.pet?._id}
                    shelterId={selectedFoster.shelter?._id}
                    fosterId={selectedFoster._id}
                    onClose={() => setShowMessageForm(false)}
                />
            )}
        </div>
    );
};

export default FosterDetails;
