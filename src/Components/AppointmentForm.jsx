// components/AppointmentForm.js
import { useEffect, useState } from 'react';
import api from '../Services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppointmentForm = ({ petId, shelterId, onClose }) => {
  const [appointmentDate, setAppointmentDate] = useState('');
  const [message, setMessage] = useState('');
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
   
    const currentDate = new Date();
    const isoString = currentDate.toISOString().slice(0, 16);
    setMinDate(isoString); 
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!appointmentDate || !message.trim()) {
        toast.error('Please provide all required fields');
        return;
    }

    try {
       const response = await api.post(`/appointment/schedule/${petId}/${shelterId}`, {
        petId,
        appointmentDate,
        message,
        shelterId,
      });
      if (response.status === 200) {
        toast.success('Appointment scheduled successfully');
        onClose(); 
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
        toast.error(error.response.data.message); 
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-70 z-50">
      <div className="bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-500 p-8 rounded-xl shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-white mb-6">Schedule Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-6">
            <label htmlFor="appointmentDate" className="block text-lg font-medium text-white">
              Appointment Date
            </label>
            <input
              type="datetime-local"
              id="appointmentDate"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="w-full p-3 mt-2 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out"
              required
              min={minDate}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-lg font-medium text-white">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 mt-2 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out"
              placeholder="Additional message..."
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md focus:outline-none transition duration-200 ease-in-out"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md focus:outline-none transition duration-200 ease-in-out"
            >
              Schedule Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AppointmentForm;
