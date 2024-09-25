import React, { useState } from "react";
import axios from "axios";

const ReviewForm = ({ productId, setReviews }) => {
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(1);
    const [error, setError] = useState(null);

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

            const response = await axios.post(
                "http://127.0.0.1:8000/api/reviews/",
                {
                    product: productId,
                    content,
                    rating,
                },
                config
            );

            setReviews((prevReviews) => [...prevReviews, response.data]);
            setContent(""); 
            setRating(1);
            setError(null);

        } catch (error) {
            console.error("Error submitting review:", error.response.data);
            setError(error.response ? error.response.data : "An error occurred");
        }
    };

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
