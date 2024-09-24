import React, { useState } from "react";
import axios from "axios";

const ReviewForm = ({ productId, setReviews }) => {
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const reposnse = await axios.post(`http://127.0.0.1:8000/api/products/${productId}/reviews/`, {
                content,
            });

            setReviews((prevReviews) => [...prevReviews, reposnse.data]);
            setContent("");

        } catch (error) {
            setError(error);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
        <h3>Leave a Review</h3>

        {error && <p>{error}</p>}

        <div>
            <label>Review</label>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="4"
                required
            />
        </div>
        <button type="submit">Submit</button>
        </form>
    );
};


export default ReviewForm;