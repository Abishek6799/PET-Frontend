import React, { useState, useEffect } from 'react';
import api from '../Services/api'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MessageForm.css';
import { IoMdCloseCircle } from 'react-icons/io';
const MessageForm = ({ petId, shelterId, onClose }) => {
    const [message, setMessage] = useState('');
    const [messageContent, setMessageContent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
   const userId = localStorage.getItem('userId');

    
    const fetchMessages = async () => {
        if (!petId) {
            setError('Pet ID is missing');
            return;
        }

        try {
            const response = await api.get(`/message/pet/${petId}`);
            const sortedMessages = response.data.messages?.sort(
                (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
            ); 
            setMessageContent(sortedMessages || []);
            setError(null);
        } catch (err) {
            setMessageContent([]);
            setError('No messages found ');
            console.log('Error fetching messages:', err);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [petId]);

   
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

       
        if (!message.trim()) {
            toast.error('Message cannot be empty');
            setLoading(false);
            return;
        }
        if (!petId || !shelterId) {
            toast.error('Missing required fields');
            setLoading(false);
            return;
        }

        try {
            const response = await api.post(`/message/create/${petId}`, {
               petId,
                content: message.trim(),
                receiverId: shelterId,
                receiverType: 'Shelter',
                senderId: userId,
                senderType: 'User',
            });

            if (response.status === 200 || response.status === 201) {
            
                setMessageContent((prevMessages) => [
                    ...prevMessages,
                    {
                        sender: 'You',
                      
                        content: message.trim(),
                        timestamp: new Date().toISOString(),
                    },
                ].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
                setMessage('');
            } else {
                throw new Error('Failed to send message');
            }
        } catch (err) {
          
            toast.error('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="MessageForm fixed inset-0 flex justify-center items-center bg-gray-700  bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    <IoMdCloseCircle className="h-10 w-10 text-red-500" />
                </button>

                <h2 className="text-2xl font-bold mb-4">Messages</h2>

              
                <div className="messages overflow-y-auto max-h-60 mb-4">
    {error && <p className="text-red-500">{error}</p>}
    {messageContent.length === 0 && !error && (
        <p className="text-gray-500">No messages yet. Start the conversation!</p>
    )}
    {messageContent.map((msg, index) => (
        <div
            key={index} 
            className={`message bubble ${
                msg.sender.id === userId ? 'bg-blue-100 text-right self-end' : 'bg-gray-100 text-left self-start'
            }`}
        >
            <strong className="text-sm font-semibold">
                {msg.sender.id === userId ? 'You' : msg.sender.name}
            </strong>
            <p>{msg.content}</p>
            <span className="text-xs text-gray-500">
                {new Date(msg.timestamp).toLocaleString()}
            </span>
        </div>
    ))}
</div>


               
                <div className="flex items-center">
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Type your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="2"
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`ml-2 px-4 py-2 rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
                    >
                        {loading ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessageForm;
