import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Função para buscar produtos de todas as páginas
  const fetchAllProducts = async () => {
    let url = 'http://127.0.0.1:8000/api/products/';  // URL da primeira página
    let allProducts = [];

    // Loop para buscar todos os produtos de todas as páginas
    while (url) {
      try {
        const response = await axios.get(url);
        allProducts = allProducts.concat(response.data.results); 
        url = response.data.next;
      } catch (error) {
        console.error('Erro ao carregar os produtos:', error);
        break;
      }
    }

    setProducts(allProducts); 
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
  };

  const filteredProducts = products.filter(product => product.category === selectedCategory);

  const uniqueCategories = [...new Set(products.map(product => product.category))];

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
                <li key={product.id}>{product.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
