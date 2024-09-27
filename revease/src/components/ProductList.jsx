import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import '../assets/styles/components/ProductList.css'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : [];

  const uniqueCategories = [...new Set(products.map(product => product.category))];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Framework Categories</h2>
      
      <div className="text-center mb-4">
        {uniqueCategories.map((category, index) => (
          <Button
            key={index} 
            onClick={() => handleCategoryClick(category)} 
            variant={selectedCategory === category ? "primary" : "outline-primary"}
            className="m-3"
          >
            {category}
          </Button>
        ))}
      </div>

      {selectedCategory && (
        <div>
          {filteredProducts.length === 0 ? (
            <p>No products found for this category.</p>
          ) : (
            <Row>
              {filteredProducts.map(product => (
                <Col md={4} key={product.id} className="mb-4 d-flex align-items-stretch">
                  <div className="card product-card w-100 d-flex flex-column justify-content-center align-items-center"> {/* Ajuste nas classes */}
                    <div className="card-body d-flex flex-column justify-content-center align-items-center">
                      <h5 className="card-title text-center">{product.name}</h5>
                      <p className="card-text text-center">
                        {product.description ? product.description : 'No description available.'}
                      </p>
                      <Link to={`/product/${product.id}`} className="btn btn-primary">
                        View Framework
                      </Link>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </div>
      )}
    </Container>
  );
};

export default ProductList;
