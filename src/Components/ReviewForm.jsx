import React, { useState } from 'react';
import api from '../Services/api';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ReviewForm = ({ petId, shelterId }) => {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [reviewType, setReviewType] = useState('pet');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleSubmit = async (e) => {
    
        setLoading(true);
        if (!comment || comment.length < 5) {
            setError('Comment should be at least 5 characters long.');
            setLoading(false);
            return;
        }

        try {
            const reviewData = {
                rating,
                comment,
                petId: reviewType === 'pet' ? petId : undefined,
                shelterId: reviewType === 'shelter' ? shelterId : undefined,
            };

            const response = reviewType === 'pet'
                ? await api.post(`/review/pet/${petId}`, reviewData, {
                      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                  })
                : await api.post(`/review/shelter/${petId}`, reviewData, {
                      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                  });

            setSuccess(response.data.message);
            setRating(1);
            setComment('');
            
          
            setIsModalOpen(false);
        } catch (error) {
            setError('You have already submitted a review for this pet.');
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <>
            <button 
    onClick={toggleModal}
    className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
>
    {isModalOpen ? "Close Review Form" : "Write a Review"}
</button>


         
            {isModalOpen && (
                <div 
                    className="fixed inset-0 flex justify-center items-center z-50 bg-gray-500 bg-opacity-50"
                    onClick={toggleModal}
                >
                    <div 
                        className="bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-lg shadow-lg w-full sm:w-96"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <h2 className="text-3xl font-semibold text-center text-rose-500 mb-6">Submit Your Review</h2>
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="mb-4">
                                <label htmlFor="reviewType" className="block text-gray-700 font-medium text-lg">Review Type</label>
                                <select 
                                    value={reviewType} 
                                    onChange={(e) => setReviewType(e.target.value)} 
                                    className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-300 ease-in-out"
                                >
                                    <option value="pet">Pet</option>
                                    <option value="shelter">Shelter</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="rating" className="block text-gray-700 font-medium text-lg">Rating</label>
                                <select
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-300 ease-in-out"
                                >
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <option key={star} value={star}>
                                            {star} Star{star > 1 && 's'}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="comment" className="block text-gray-700 font-medium text-lg">Comment</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Leave a detailed comment"
                                    required
                                    minLength="5"
                                    className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-300 ease-in-out"
                                />
                            </div>

                            <button 
                                type="submit" 
                                className={`w-full py-4 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-xl ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loading}
                            >
                                {loading ? 'Submitting...' : 'Submit Review'}
                                
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ReviewForm;
