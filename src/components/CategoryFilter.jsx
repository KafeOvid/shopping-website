import { useState, useEffect } from 'react';
import { getAllCategories } from '../services/api';
import '../assets/categoryFilter.css';

const CategoryFilter = ({ onSelectCategory, selectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getAllCategories();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="categories-loading">Loading categories...</div>;
  }

  if (error) {
    return <div className="categories-error">{error}</div>;
  }

  return (
    <div className="categories-filter">
      <h3 className="categories-title">Categories</h3>
      <ul className="categories-list">
        <li className="category-item">
          <button 
            className={`category-btn ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => onSelectCategory(null)}
          >
            All Products
          </button>
        </li>
        {categories.map((category) => (
          <li className="category-item" key={category}>
            <button
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onSelectCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter; 