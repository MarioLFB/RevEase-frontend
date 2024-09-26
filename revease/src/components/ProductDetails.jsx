import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();  
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { user } = useContext(AuthContext);

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
      <ReviewList productId={product.id} reviews={reviews} />
    </div>
  );
};

export default ProductDetails;
