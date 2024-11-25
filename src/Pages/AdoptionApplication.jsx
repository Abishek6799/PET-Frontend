import React, { useState } from 'react';
import api from '../Services/api';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdoptionApplication = () => {
    const { petId, shelterId } = useParams();
    const [adopterName, setAdopterName] = useState('');
    const [adopterEmail, setAdopterEmail] = useState('');
    const [message, setMessage] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleNameChange = (e) => setAdopterName(e.target.value);
    const handleEmailChange = (e) => setAdopterEmail(e.target.value);
    const handleMessageChange = (e) => setMessage(e.target.value);
    const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
    const handleAddressChange = (e) => setAddress(e.target.value);
    const handleLocationChange = (e) => setLocation(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        if (!adopterName || !adopterEmail || !message || !phoneNumber || !address || !location) {
            setError('Please fill in all the fields');
            setLoading(false);
            return;
        }

        try {
            const response = await api.post(`/application/submit/${petId}/${shelterId}`, {
                petId,
                shelterId,
                adopterName,
                adopterEmail,
                message,
                phoneNumber,
                address,
                location,
            });

            if (response.status === 201) {
                setSuccessMessage(response.data.message);
                toast.success("Application submitted successfully!");
                setAdopterName('');
                setAdopterEmail('');
                setMessage('');
                setPhoneNumber('');
                setAddress('');
                setLocation('');
                navigate('/user-profile');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 via-teal-500 to-blue-500 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl p-8">
                <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">Adoption Application</h1>
                {error && <div className="bg-red-100 p-3 mb-4 text-red-600 rounded">{error}</div>}
                {successMessage && <div className="bg-green-100 p-3 mb-4 text-green-600 rounded">{successMessage}</div>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                        <div>
                            <label htmlFor="adopterName" className="block text-sm font-semibold text-gray-600">Full Name</label>
                            <input
                                type="text"
                                id="adopterName"
                                name="adopterName"
                                placeholder="Enter full name"
                                required
                                className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={adopterName}
                                onChange={handleNameChange}
                            />
                        </div>

                     
                        <div>
                            <label htmlFor="adopterEmail" className="block text-sm font-semibold text-gray-600">Email Address</label>
                            <input
                                type="email"
                                id="adopterEmail"
                                name="adopterEmail"
                                placeholder="Enter email address"
                                required
                                className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={adopterEmail}
                                onChange={handleEmailChange}
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
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
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
                                value={location}
                                onChange={handleLocationChange}
                            />
                        </div>
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
                            value={address}
                            onChange={handleAddressChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-600">Message to Shelter</label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Enter your message"
                            required
                            className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            rows="4"
                            value={message}
                            onChange={handleMessageChange}
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className={` py-4 px-6 bg-teal-600 text-white font-bold rounded-lg shadow-md hover:bg-teal-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit Application'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdoptionApplication;
