import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReviewForm = ({ productId, fetchReviews }) => {
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(1);
    const [error, setError] = useState(null);
    const [hasReview, setHasReview] = useState(false);

    const { user, token } = useContext(AuthContext);

    useEffect(() => {
        if (!user) return;

        const checkUserReview = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                };

                const response = await axios.get("http://127.0.0.1:8000/api/reviews/", config);
                const userReview = response.data.results.find(
                    (review) => review.product === productId && review.author === user
                );
                if (userReview) {
                    setHasReview(true);
                }
            } catch (error) {
                console.error("Error checking user review:", error);
                setError("Failed to check user review");
            }
        };

        checkUserReview();
    }, [productId, user, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            setError("User not authenticated");
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Token ${token}`,
                },
            };

            await axios.post(
                "http://127.0.0.1:8000/api/reviews/",
                { product: productId, content, rating },
                config
            );

            setContent("");
            setRating(1);
            setError(null);
            setHasReview(true);

            fetchReviews();

        } catch (error) {
            console.error("Error submitting review:", error);
            setError(error.response ? error.response.data : "An error occurred");
        }
    };

    if (!user) {
        return <p className="text-center text-muted">You need to be logged in to submit a review.</p>;
    }

    if (hasReview) {
        return <p className="text-center text-muted">Only one review allowed per user.</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="text-center mt-4">
            {error && <p className="text-danger">{error}</p>}

            <div className="form-group mb-3">
                <label className="form-label lead">Review</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="4"
                    className="form-control w-50 mx-auto"
                    required
                />
            </div>

            <div className="form-group mb-3">
                <label className="form-label lead">Rating</label>
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    min="1"
                    max="5"
                    className="form-control w-25 mx-auto"
                    required
                />
            </div>

            <button type="submit" className="btn btn-primary btn-lg">Submit</button>
        </form>
    );
};

export default ReviewForm;
