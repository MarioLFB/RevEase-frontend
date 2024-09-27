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
        return <p className="text-center text-muted">No reviews yet for this product.</p>;
    }

    return (
        <div className="container mt-4">
            <h3 className="text-center mb-4">Product Reviews</h3>
            <ul className="list-group">
                {reviews.map((review) => (
                    <li key={review.id} className="list-group-item mb-3">
                        {editingReviewId === review.id ? (
                            <div className="mb-3">
                                <textarea
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                    className="form-control mb-2"
                                    rows="3"
                                />
                                <input
                                    type="number"
                                    value={editedRating}
                                    min="1"
                                    max="5"
                                    onChange={(e) => setEditedRating(e.target.value)}
                                    className="form-control mb-2"
                                />
                                <div className="d-flex justify-content-end">
                                    <button onClick={handleUpdate} className="btn btn-success me-2">
                                        Update
                                    </button>
                                    <button onClick={() => setEditingReviewId(null)} className="btn btn-secondary">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                {/* Estilo para o Rating */}
                                <p>
                                    <span className="fw-bold">Rating:</span>{" "}
                                    <span className="badge bg-primary">{review.rating}/5</span>
                                </p>

                                {/* Estilo para o Author */}
                                <p>
                                    <span className="fw-bold text-primary">Author:</span> {review.author}
                                </p>

                                {/* Estilo para o conteúdo do review */}
                                <p className="text-muted">{review.content}</p>

                                {user && review.author === user && (
                                    <div className="d-flex justify-content-end mt-2">
                                        <button onClick={() => handleEdit(review)} className="btn btn-warning me-2">
                                            Edit
                                        </button>
                                        <button onClick={() => onDelete(review.id)} className="btn btn-danger">
                                            Delete
                                        </button>
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
