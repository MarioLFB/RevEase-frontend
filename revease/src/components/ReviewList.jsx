import React, { useState, useEffect } from "react";
import axios from "axios";

const ReviewList = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editedContent, setEditedContent] = useState("");
    const [editedRating, setEditedRating] = useState(1);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/reviews/");
                const filteredReviews = response.data.results.filter(review => review.product === productId);
                setReviews(filteredReviews);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching reviews:", error);
                setError('Failed to load reviews');
                setLoading(false);
            }
        };

        fetchReviews();
    }, [productId]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/reviews/${id}/`, {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            });
            setReviews(reviews.filter(review => review.id !== id));
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    const handleEdit = (review) => {
        setEditingReviewId(review.id);
        setEditedContent(review.content);
        setEditedRating(review.rating);
    };

    const handleUpdate = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("User not authenticated");
                return;
            }

            const config = {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            const response = await axios.put(
                `http://127.0.0.1:8000/api/reviews/${id}/`,
                {
                    product: productId, 
                    content: editedContent,
                    rating: editedRating,
                },
                config
            );

            setReviews(reviews.map(review => review.id === id ? { ...review, content: editedContent, rating: editedRating } : review));
            setEditingReviewId(null); 
        } catch (error) {
            console.error("Error updating review:", error.response.data || error);
            setError("Failed to update review");
        }
    };

    if (loading) return <p>Loading reviews...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h3>Product Reviews</h3>
            {reviews.length === 0 ? (
                <p>No reviews yet for this product.</p>
            ) : (
                <ul>
                    {reviews.map((review) => (
                        <li key={review.id}>
                            {editingReviewId === review.id ? (
                                <div>
                                    <textarea 
                                        value={editedContent} 
                                        onChange={(e) => setEditedContent(e.target.value)} 
                                    />
                                    <input
                                        type="number"
                                        value={editedRating}
                                        min="1"
                                        max="5"
                                        onChange={(e) => setEditedRating(e.target.value)}
                                    />
                                    <button onClick={() => handleUpdate(review.id)}>Update</button>
                                    <button onClick={() => setEditingReviewId(null)}>Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    <p><strong>Rating:</strong> {review.rating}/5</p>
                                    <p><strong>Author:</strong> {review.author}</p>
                                    <p>{review.content}</p>
                                    {review.author === localStorage.getItem("username") && (
                                        <div>
                                            <button onClick={() => handleEdit(review)}>Edit</button>
                                            <button onClick={() => handleDelete(review.id)}>Delete</button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReviewList;
