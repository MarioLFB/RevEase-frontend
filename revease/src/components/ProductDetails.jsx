import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import { AuthContext } from '../context/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();  
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]); 
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price:</strong> {product.price}</p>

      {user && <ReviewForm productId={product.id} fetchReviews={fetchReviews} />}
      <ReviewList 
        reviews={reviews} 
        onDelete={handleDeleteReview} 
        onUpdate={handleUpdateReview} 
      />
    </div>
  );
};

export default ProductDetails;
