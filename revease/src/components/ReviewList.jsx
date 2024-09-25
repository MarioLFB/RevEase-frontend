import React, { useState, useEffect } from "react";
import axios from "axios";

const ReviewList = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                            <p><strong>Rating:</strong> {review.rating}/5</p>
                            <p><strong>Author:</strong> {review.author}</p>
                            <p>{review.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReviewList;
