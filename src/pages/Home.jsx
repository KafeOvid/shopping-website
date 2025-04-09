import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts, getProductsByCategory, getAllCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import '../assets/home.css';

// Featured categories
const categoryData = [
  { id: 1, name: 'Women', icon: '👗' },
  { id: 2, name: 'Men', icon: '👔' },
  { id: 3, name: 'Kids', icon: '🧸' },
  { id: 4, name: 'Accessories', icon: '👜' },
  { id: 5, name: 'Beauty', icon: '💄' },
  { id: 6, name: 'Home', icon: '🏠' },
];

// Hero carousel slides
const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    title: 'Summer Collection 2024',
    subtitle: 'Exclusive designs for the season',
    cta: 'Shop Now',
    link: '/products',
    align: 'left',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    title: 'Luxury Accessories',
    subtitle: 'Complete your look with our premium selection',
    cta: 'Discover',
    link: '/products',
    align: 'right',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    title: 'New Arrivals',
    subtitle: 'Be the first to wear our latest styles',
    cta: 'View Collection',
    link: '/products',
    align: 'center',
  }
];

// Featured products
const featuredProducts = [
  {
    id: 1,
    name: 'Summer Dress',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'Women',
    rating: 4.5,
    badge: 'New',
  },
  {
    id: 2,
    name: 'Casual Shirt',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'Men',
    rating: 4.2,
    badge: 'Sale',
  },
  {
    id: 3,
    name: 'Leather Bag',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'Accessories',
    rating: 4.8,
    badge: 'Hot',
  }
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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

  // Auto-rotate slider functionality
  useEffect(() => {
    if (isAutoPlaying) {
      slideInterval.current = setInterval(() => {
        setCurrentSlide((prevSlide) => 
          prevSlide === heroSlides.length - 1 ? 0 : prevSlide + 1
        );
      }, 5000);
    }
    
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [isAutoPlaying]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchTerm('');
  };

  const handleCategoryButtonClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setSearchTerm('');
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    
    // Reset timer when manually changing slides
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
    
    if (isAutoPlaying) {
      slideInterval.current = setInterval(() => {
        setCurrentSlide((prevSlide) => 
          prevSlide === heroSlides.length - 1 ? 0 : prevSlide + 1
        );
      }, 5000);
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div className="home-page">
      {/* Hero Carousel */}
      <section className="hero-carousel">
        <div className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div 
              key={slide.id} 
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ 
                backgroundImage: `url(${slide.image})`,
                justifyContent: slide.align === 'left' ? 'flex-start' : slide.align === 'right' ? 'flex-end' : 'center'
              }}
            >
              <div className="hero-content">
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
                <Link to={slide.link} className="hero-cta">
                  {slide.cta}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
          
          {/* Carousel Navigation */}
          <div className="hero-nav">
            <div className="hero-dots">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => handleSlideChange(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button 
              className={`hero-autoplay ${isAutoPlaying ? 'active' : ''}`}
              onClick={toggleAutoPlay}
              aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isAutoPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              )}
            </button>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-title">
          <h2>Shop by Category</h2>
          <p>Explore our wide selection of products</p>
        </div>
        <div className="categories-grid">
          {categoryData.map(category => (
            <Link key={category.id} to={`/products?category=${category.name}`} className="category-card">
              <span className="category-icon">{category.icon}</span>
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="section-title">
          <h2>Featured Products</h2>
          <p>Handpicked just for you</p>
        </div>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <div key={product.id} className="product-card">
              {product.badge && <span className="product-badge">{product.badge}</span>}
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-actions">
                  <button className="action-btn wishlist" aria-label="Add to wishlist">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </button>
                  <button className="action-btn cart" aria-label="Add to cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                  </button>
                  <button className="action-btn quick-view" aria-label="Quick view">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-details">
                  <span className="product-price">${product.price.toFixed(2)}</span>
                  <div className="product-rating">
                    <span className="stars" style={{ '--rating': product.rating }}></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all-container">
          <Link to="/products" className="view-all-btn">
            View All Products
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </section>
      
      {/* Promotional Banner */}
      <section className="promo-banner">
        <div className="promo-content">
          <h2>Summer Sale</h2>
          <p>Up to 50% off on selected items</p>
          <Link to="/products" className="promo-cta">Shop the Sale</Link>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Get the latest updates on new products and upcoming sales</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home; 