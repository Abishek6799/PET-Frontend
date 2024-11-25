import React, { useEffect, useState } from 'react';
import api from '../Services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaComment, FaTrashAlt, FaCalendarAlt } from 'react-icons/fa'; 
import MessageForm from "../Components/MessageForm";
import AppointmentForm from "../Components/AppointmentForm";

const UserProfile = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showMessageForm, setShowMessageForm] = useState(false);
    const [showAppointmentForm, setShowAppointmentForm] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await api.get('/application/user');
                setApplications(response.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
               
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await api.get('/appointment/user');
                setAppointments(response.data);
                setLoading(false);
            } catch (err) {
                
                
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const handleDelete = async (applicationId) => {
        try {
            await api.delete(`/application/delete/${applicationId}`);
            toast.success("Application deleted successfully!");
            setApplications(applications.filter((application) => application._id !== applicationId));
        } catch (error) {
            toast.error("Error deleting application");
        }
    };

    const handleMessageClick = (application) => {
        setSelectedApplication(application);
        setShowMessageForm(true);
    };

    const handleAppointmentClick = (application) => {
        setSelectedApplication(application);
        setShowAppointmentForm(true);
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-blue-200 p-6">
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-teal-300 via-purple-400 to-indigo-500 p-8 rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out">
                <h1 className="text-center text-4xl font-semibold text-white mb-6">User Profile</h1>
                
                {error && <div className="text-center text-red-500 mb-4">{error}</div>}
                
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Adoption Applications</h2>

                {applications.length === 0 ? (
                    <p className="text-center text-gray-600">You have no adoption applications yet.</p>
                ) : (
                    <div className="space-y-6">
                        {applications.map((application) => (
                            <div key={application._id} className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <img 
                                            src={application.petImage || '/default-image.jpg'} 
                                            alt={application.petName}
                                            onError={(e) => (e.target.src = '/default-image.jpg')}
                                            className="w-20 h-20 object-cover rounded-full border-4 border-indigo-500 shadow-md" />
                                        <div>
                                            <h3 className="text-xl font-semibold text-indigo-700">{application.petName}</h3>
                                            <p><strong>Status:</strong> 
                                                <span className={`px-3 py-1 rounded-full text-white text-sm ${application.status === 'approved' ? 'bg-green-500' : application.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                                                    {application.status || 'Pending'}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        <p><strong>Submitted on:</strong> {new Date(application.dateApplied).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="mt-4 text-gray-700">
                                    <p><strong>Message:</strong> {application.message}</p>
                                </div>
                                

                           
                                {application.status === 'approved' && (
                                    <div className="mt-4 text-gray-700">
                                        {appointments.filter(appointment => appointment.applicationId === application._id).map((appointment) => (
                                            <div key={appointment._id}>
                                                <p><strong>Appointment Date:</strong> {appointment.appointmentDate || 'Not set yet'}</p>
                                                <p><strong>Appointment Status:</strong> {appointment.status || 'Not confirmed'}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex justify-between mt-6">
                                    <button 
                                        onClick={() => handleMessageClick(application)}
                                        className="bg-blue-500 text-white flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
                                        <FaComment />
                                        <span>Message</span>
                                    </button>

                                    {application.status === 'approved' && (
                                        <button 
                                            onClick={() => handleAppointmentClick(application)}
                                            className="bg-green-500 text-white flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-green-600 transition duration-200">
                                            <FaCalendarAlt />
                                            <span>Schedule Appointment</span>
                                        </button>
                                    )}
                                    {
                                        application.status === 'pending' && (
                                            <button 
                                                onClick={() => handleDelete(application._id)}
                                                className="bg-red-500 text-white flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-red-600 transition duration-200">
                                                <FaTrashAlt />
                                                <span>Delete</span>
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            
                {showMessageForm && selectedApplication && (
                    <MessageForm 
                        petId={selectedApplication.Pet} 
                        shelterId={selectedApplication.Shelter} 
                        onClose={() => setShowMessageForm(false)} 
                        applicationId={selectedApplication._id} 
                    />
                )}

        
                {showAppointmentForm && selectedApplication && (
                    <AppointmentForm 
                        petId={selectedApplication.Pet}
                        shelterId={selectedApplication.Shelter}
                        onClose={() => setShowAppointmentForm(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default UserProfile;
