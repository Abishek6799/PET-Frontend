import React, { useEffect, useState } from 'react';
import api from '../Services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppointmentList = ({ petId }) => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);

    const fetchAppointments = async () => {
        if (!petId) {
            setError('Pet ID is missing');
            return;
        }

        try {
            const response = await api.get(`/appointment/pet/${petId}`);
            

            if (response.data && Array.isArray(response.data)) {
                setAppointments(response.data);
            } else {
                setAppointments([]);
                setError('No appointments found');
            }

            setError(null);
        } catch (error) {
            
            setError('No appointments found');
            setAppointments([]);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, [petId]);

    const formatDateTime = (isoDate) => {
        const dateObj = new Date(isoDate);
        return `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        })}`;
    };

    const handleUpdateStatus = async (appointmentId, status) => {
        try {
            const response = await api.put(`/appointment/update/${appointmentId}`, {
                status,
                message:
                    status === 'confirmed'
                        ? 'Your appointment has been confirmed.'
                        : 'Your appointment has been cancelled.',
            });

            if (status === 'confirmed') {
                  api.put(`/pet/update-status/${petId}`, { status: 'adopted' });
            }

            toast.success(response.data.message);
            setAppointments((prev) =>
                prev.map((app) =>
                    app._id === appointmentId ? { ...app, status } : app
                )
            );
           
        } catch (error) {
           
            toast.error('Failed to update appointment status');
        }
    };

    return (
        <div>
            <h3 className="text-xl font-bold mb-4">Appointment</h3>
            {error && <p className="text-red-500">{error}</p>}
            {appointments.length > 0 ? (
                appointments.map((appointment) => (
                    <div key={appointment._id} className="p-4 border rounded mb-4">
                        <p>
                            <strong>Status:</strong> 
                          
                            <span 
                                className={`font-bold text-white px-2 py-1 rounded-md ${
                                    appointment.status === 'pending'
                                    ? 'bg-yellow-400' 
                                    : appointment.status === 'confirmed'
                                    ? 'bg-green-500'
                                    : 'bg-red-500'
                                }`}
                            >
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                        </p>
                        <p><strong>Date:</strong> {formatDateTime(appointment.appointmentDate)}</p>
                        {appointment.status === 'confirmed' && (
                            <p>
                                <strong>Pet :</strong>{' '}
                                <span>Adopted</span>
                            </p>
                        )}
                        <div className="mt-2 flex space-x-4">
                        
                            <button
                                className={`px-4 py-2 text-white font-bold rounded-lg transition-colors duration-300 ${appointment.status === 'pending' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'}`}
                                onClick={() => handleUpdateStatus(appointment._id, 'confirmed')}
                                disabled={appointment.status !== 'pending'}
                            >
                                Confirm
                            </button>

                          
                            <button
                                className={`px-4 py-2 text-white font-bold rounded-lg transition-colors duration-300 ${appointment.status === 'pending' ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300 cursor-not-allowed'}`}
                                onClick={() => handleUpdateStatus(appointment._id, 'cancelled')}
                                disabled={appointment.status !== 'pending'}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No appointments found.</p>
            )}
        </div>
    );
};

export default AppointmentList;
