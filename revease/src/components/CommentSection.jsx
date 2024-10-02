// src/components/CommentSection.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const CommentSection = ({ reviewId }) => {
  const { user, token } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/reviews/${reviewId}/comments/`);
      setComments(response.data.results);
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError('Error fetching comments. Please check if the API is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [reviewId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/reviews/${reviewId}/comments/`,
        { content: newComment },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setNewComment('');
      fetchComments();
    } catch (err) {
      console.error('Error adding comment:', err);
      setError('Error adding comment. Please try again later.');
    }
  };

  const handleEditClick = (commentId, content) => {
    setEditCommentId(commentId);
    setEditCommentContent(content);
  };

  const handleCancelEdit = () => {
    setEditCommentId(null);
    setEditCommentContent('');
  };

  const handleEditComment = async (e) => {
    e.preventDefault();
    if (!editCommentContent.trim()) return;

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/comments/${editCommentId}/`,
        { content: editCommentContent },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setEditCommentId(null);
      setEditCommentContent('');
      fetchComments();
    } catch (err) {
      console.error('Error editing comment:', err);
      setError('Error editing comment. Please try again later.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/comments/${commentId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (err) {
      console.error('Error deleting comment:', err);
      setError('Error deleting comment. Please try again later.');
    }
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="mt-5">
      <h3 className="text-center mb-4">Comments</h3>
      
      {comments.length === 0 ? (
        <p className="text-center text-muted">No comments found for this review.</p>
      ) : (
        <ul className="list-group mb-4">
          {comments.map((comment) => (
            <li key={comment.id} className="list-group-item d-flex justify-content-between align-items-center">
              {editCommentId === comment.id ? (
                <form className="w-100" onSubmit={handleEditComment}>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      rows="2"
                      value={editCommentContent}
                      onChange={(e) => setEditCommentContent(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="mt-2 d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary me-2" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-success">
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div>
                    <strong>{comment.author}</strong>: {comment.content}
                  </div>
                  {comment.author === user && (
                    <div>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEditClick(comment.id, comment.content)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {user ? (
        <form onSubmit={handleAddComment} className="text-center">
          <div className="form-group mb-3">
            <textarea
              className="form-control"
              rows="3"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here..."
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Add Comment</button>
        </form>
      ) : (
        <p className="text-center text-muted">Log in to add a comment.</p>
      )}
    </div>
  );
};

export default CommentSection;
