import React, { useEffect, useState } from 'react';
import api from '../Services/api';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FaTrashAlt, FaCaretUp, FaCaretDown } from 'react-icons/fa';

const ShelterReviews = ({ shelterId, petId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(false); 
    const userId = localStorage.getItem('userId');
    
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const { data } = await api.get(`/review/shelter/${shelterId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (data && data.message) {
                    setReviews(data.message);
                } else {
                    setReviews(data);
                }
                setLoading(false);
            } catch (error) {
                setError('Error fetching reviews.');
                toast.error('Error fetching reviews.');
                setLoading(false);
            }
        };

        fetchReviews();
    }, [shelterId,petId]);

    const handleDelete = async (reviewId) => {
        try {
            const response = await api.delete(`/review/delete/${reviewId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setReviews(reviews.filter((review) => review._id !== reviewId));
            toast.success(response.data.message);
        } catch (error) {
            toast.error('Failed to delete review');
        }
    };

    if (loading) return <p className="text-center text-lg font-medium text-gray-600">Loading reviews...</p>;
    if (error) return <p className="text-center text-lg font-medium text-red-500">{error}</p>;

    return (
        <div className="max-w-3xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-semibold text-center text-blue-700">Reviews for this Shelter</h3>
                <button 
                    className="text-xl text-blue-500 hover:text-blue-700 transition duration-300"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FaCaretUp /> : <FaCaretDown />}
                </button>
            </div>

            {isOpen && (
                <>
                    {reviews.length === 0 ? (
                        <p className="text-center text-lg text-gray-500">No reviews yet for this shelter.</p>
                    ) : (
                        reviews.map((review) => (
                            <div key={review._id} className="review-card transition-all duration-300 hover:shadow-xl hover:scale-105 border-b-2 py-4 mb-6 bg-gray-50 rounded-lg">
                                <div className="flex ml-6 justify-between items-center">
                                    <p className="font-bold text-xl text-gray-800">{review.user?.name || "Unknown"}</p>
                                    <p className="text-yellow-500 mr-20 font-semibold text-2xl">{review.rating} Star{review.rating > 1 && 's'}</p>
                                </div>
                                <p className="text-gray-600 ml-10 mt-2 text-lg">{review.comment}</p>
                                <p className="text-sm ml-10 text-gray-500 mt-1">{new Date(review.dateReviewed).toLocaleDateString()}</p>
                                {review.user?._id === userId && (
                                    <button 
                                        onClick={() => handleDelete(review._id)} 
                                        className="bg-red-600 text-white px-6 ml-4 py-2 rounded-md mt-4 text-sm font-semibold flex items-center hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                                    >
                                        <FaTrashAlt className="mr-2" /> Delete Review
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </>
            )}
        </div>
    );
};

export default ShelterReviews;
