import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../assets/productCard.css';

const ProductCard = ({ product }) => {
  const { id, title, price, image, category } = product;
  const [isHovering, setIsHovering] = useState(false);
  
  // Randomly determine if the product has a discount (for demo purposes)
  const hasDiscount = id % 3 === 0;
  const discountPercentage = hasDiscount ? Math.floor(Math.random() * 20) + 10 : 0; // 10-30% discount
  
  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="product-image">
        <img src={image} alt={title} />
        <Link to={`/product/${id}`} className="quick-view-overlay">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </Link>
        {hasDiscount && (
          <div className="discount-badge">
            {discountPercentage}% OFF
          </div>
        )}
      </div>
      <div className="product-info">
        <div className="product-category">{category}</div>
        <h3 className="product-title">
          <Link to={`/product/${id}`}>{title}</Link>
        </h3>
        <div className="product-price">
          {hasDiscount && (
            <span className="original-price">${price.toFixed(2)}</span>
          )}
          ${hasDiscount 
            ? (price - (price * discountPercentage / 100)).toFixed(2) 
            : price.toFixed(2)
          }
        </div>
        <Link to={`/product/${id}`} className="view-details-btn">
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default ProductCard; 