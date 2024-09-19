import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products/')
      .then(response => {
        console.log(response.data.results);
        setProducts(response.data.results);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      {products.length > 0 ? (
        <ul>
          {products.map(product => (
            <li key={product.id}>{product.owner}</li>
          ))}
        </ul>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}

export default ProductList;
