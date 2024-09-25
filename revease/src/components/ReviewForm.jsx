import React, { useState, useEffect } from "react";
import axios from "axios";

const ReviewForm = ({ productId, setReviews }) => {
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(1);
    const [error, setError] = useState(null);
    const [hasReview, setHasReview] = useState(false);

    const isAuthenticated = !!localStorage.getItem("token");

    useEffect(() => {
        if (!isAuthenticated) return;

        const checkUserReview = async () => {
            const token = localStorage.getItem("token");

            try {
                const config = {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                };

                const response = await axios.get("http://127.0.0.1:8000/api/reviews/", config);
                const userReview = response.data.results.find(
                    (review) => review.product === productId && review.author === localStorage.getItem("username")
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
    }, [productId, isAuthenticated]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

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
                {
                    product: productId,
                    content,
                    rating,
                },
                config
            );

            setContent("");
            setRating(1);
            setError(null);
            setHasReview(true);

            window.location.reload();

        } catch (error) {
            console.error("Error submitting review:", error.response.data);
            setError(error.response ? error.response.data : "An error occurred");
        }
    };

    if (!isAuthenticated) {
        return <p>You need to be logged in to submit a review.</p>;
    }

    if (hasReview) {
        return <p>Only one review allowed per user.</p>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Leave a Review</h3>

            {error && <p style={{ color: "red" }}>{error.detail || "Something went wrong"}</p>}

            <div>
                <label>Review</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="4"
                    required
                />
            </div>

            <div>
                <label>Rating</label>
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    min="1"
                    max="5"
                    required
                />
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default ReviewForm;
