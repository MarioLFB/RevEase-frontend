import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import CommentSection from './CommentSection';

const ProductDetails = () => {
  const { id } = useParams();  
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]); 
  const [hasReview, setHasReview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching product details.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/reviews/`, {
        params: { product: id }
      });
      setReviews(response.data.results);

      const userReview = response.data.results.find(review => review.author === user);
      setHasReview(!!userReview);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/reviews/${reviewId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      setReviews(reviews.filter((review) => review.id !== reviewId));
      setHasReview(false); 
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleUpdateReview = async (reviewId, updatedContent, updatedRating) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/reviews/${reviewId}/`,
        { product: id, content: updatedContent, rating: updatedRating },
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setReviews(reviews.map((review) =>
        review.id === reviewId ? { ...review, content: updatedContent, rating: updatedRating } : review
      ));
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  if (loading) return <p className="text-center text-muted">Loading...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;
  if (!product) return <p className="text-center text-muted">No product found.</p>;

  return (
    <div className="container mt-5">
      <div className="card mb-4 p-4 shadow-sm text-center">
        <h1 className="card-title display-4 mb-3">{product.name}</h1>
        <p className="card-text lead">
          <strong>Description:</strong> {product.description}
        </p>
        <p className="card-text lead">
          <strong>Category:</strong> {product.category}
        </p>
        <p className="card-text lead">
          <strong>Price:</strong> ${product.price}
        </p>
      </div>

      {user && !hasReview && (
        <div className="card mb-4 p-4 shadow-sm text-center">
          <h3 className="card-title mb-4">Leave a Review</h3>
          <ReviewForm productId={product.id} fetchReviews={fetchReviews} />
        </div>
      )}

      <div className="card mb-4 p-4 shadow-sm text-center">
        <h3 className="card-title mb-4">Reviews</h3>
        <ReviewList 
          reviews={reviews} 
          onDelete={handleDeleteReview} 
          onUpdate={handleUpdateReview} 
        />
      </div>
      {reviews.length > 0 && reviews.map((review) => (
        <div key={review.id} className="mb-4">
          <CommentSection reviewId={review.id} />
        </div>
      ))}
    </div>
  );
};

export default ProductDetails;
