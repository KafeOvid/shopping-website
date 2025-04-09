import React, { useState, useEffect } from 'react';
import { getAllProducts, getProductsByCategory, getAllCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import '../assets/products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('default');

  // Fetch products based on selected category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = selectedCategory 
          ? await getProductsByCategory(selectedCategory)
          : await getAllProducts();
          
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  // Fetch all available categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  // Filter products by search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      const filtered = products.filter((product) => 
        product.title.toLowerCase().includes(lowercaseSearchTerm) ||
        product.description.toLowerCase().includes(lowercaseSearchTerm) ||
        product.category.toLowerCase().includes(lowercaseSearchTerm)
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  // Sort products when sort option changes
  useEffect(() => {
    let sortedProducts = [...filteredProducts];
    
    switch(sortOption) {
      case 'price-low-high':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sortedProducts.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      case 'alphabetical':
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // Default sorting (by id/newest)
        break;
    }
    
    setFilteredProducts(sortedProducts);
  }, [sortOption]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchTerm('');
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>All Products</h1>
        <p>Discover our wide range of high-quality products</p>
      </div>
      
      <div className="products-filters">
        <div className="filter-section">
          <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
          
          <div className="sort-wrapper">
            <label htmlFor="sort">Sort by:</label>
            <select 
              id="sort" 
              value={sortOption} 
              onChange={handleSortChange}
              className="sort-select"
            >
              <option value="default">Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>
        
        <CategoryFilter 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onSelectCategory={handleCategorySelect}
        />
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading-container">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="products-count">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            {selectedCategory && <span> in <strong>{selectedCategory}</strong></span>}
            {searchTerm && <span> matching "<strong>{searchTerm}</strong>"</span>}
          </div>
          
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="no-products">
                <p>No products found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Products; 