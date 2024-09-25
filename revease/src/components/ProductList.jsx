import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchAllProducts = async () => {
    let url = 'http://127.0.0.1:8000/api/products/';
    let allProducts = [];

    while (url) {
      try {
        const response = await axios.get(url);
        allProducts = allProducts.concat(response.data.results);  
        url = response.data.next; 
      } catch (error) {
        setError('Error fetching products.');
        break;
      }
    }

    setProducts(allProducts); 
    setLoading(false); 
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);


  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
  };

  const filteredProducts = products.filter(product => product.category === selectedCategory);

  const uniqueCategories = [...new Set(products.map(product => product.category))];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {uniqueCategories.map((category, index) => (
        <button key={index} onClick={() => handleCategoryClick(category)}>
          {category}
        </button>
      ))}

      {selectedCategory && (
        <div>
          {filteredProducts.length === 0 ? (
            <p>No products found for this category.</p>
          ) : (
            <ul>
              {filteredProducts.map(product => (
                <li key={product.id}>
                  <Link to={`/product/${product.id}`}>{product.name}</Link> 
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
