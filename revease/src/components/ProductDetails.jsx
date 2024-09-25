import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewForm from './ReviewForm';


const ProductDetails = () => {
  const { id } = useParams();  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price:</strong> {product.price}</p>

      <ReviewForm productId={product.id} setReviews={() => {}} />
    </div>
  );
};

export default ProductDetails;
