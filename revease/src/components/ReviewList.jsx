import React, { useState, useContext } from "react";
import { AuthContext } from '../context/AuthContext';

const ReviewList = ({ reviews, onDelete, onUpdate }) => { 
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editedContent, setEditedContent] = useState("");
    const [editedRating, setEditedRating] = useState(1);

    const { user } = useContext(AuthContext);

    const handleEdit = (review) => {
        setEditingReviewId(review.id);
        setEditedContent(review.content);
        setEditedRating(review.rating);
    };

    const handleUpdate = () => {
        onUpdate(editingReviewId, editedContent, editedRating);
        setEditingReviewId(null); 
    };

    if (reviews.length === 0) {
        return <p>No reviews yet for this product.</p>;
    }

    return (
        <div>
            <h3>Product Reviews</h3>
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
                                <button onClick={handleUpdate}>Update</button>
                                <button onClick={() => setEditingReviewId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <p><strong>Rating:</strong> {review.rating}/5</p>
                                <p><strong>Author:</strong> {review.author}</p>
                                <p>{review.content}</p>
                                {user && review.author === user && (
                                    <div>
                                        <button onClick={() => handleEdit(review)}>Edit</button>
                                        <button onClick={() => onDelete(review.id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReviewList;
