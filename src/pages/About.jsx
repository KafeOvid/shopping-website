import React from 'react';
import '../assets/about.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About ShopEase</h1>
        <p>Your trusted shopping destination since 2020</p>
      </div>
      
      <div className="about-content">
        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            ShopEase was founded with a simple mission: to make online shopping effortless, enjoyable, and accessible to everyone. 
            What started as a small passion project has grown into a beloved online marketplace offering a carefully curated selection 
            of products across multiple categories.
          </p>
          <p>
            Our journey began when our founders noticed how complicated and time-consuming online shopping had become. 
            Too many choices, confusing interfaces, and unpredictable quality were making what should be a pleasant 
            experience into a chore. We set out to change that by creating a streamlined platform with only the best products, 
            presented in a clean, intuitive interface.
          </p>
        </div>
        
        <div className="about-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🔍</div>
              <h3>Quality First</h3>
              <p>We carefully vet every product to ensure it meets our high standards for quality and value.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌿</div>
              <h3>Sustainability</h3>
              <p>We're committed to reducing our environmental impact through eco-friendly practices.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💯</div>
              <h3>Transparency</h3>
              <p>Honest pricing, clear policies, and no hidden fees—ever.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Community</h3>
              <p>Supporting local producers and giving back to the communities we serve.</p>
            </div>
          </div>
        </div>
        
        <div className="about-section">
          <h2>Our Team</h2>
          <p>
            Behind ShopEase is a dedicated team of retail experts, tech enthusiasts, and customer service specialists 
            who share a passion for creating the best possible shopping experience. We're a diverse group with backgrounds 
            spanning from traditional retail to cutting-edge e-commerce technology.
          </p>
          <p>
            What unites us is our commitment to making online shopping better for everyone. We believe that shopping 
            should be a joy, not a chore, and we bring that philosophy to every aspect of what we do.
          </p>
        </div>
        
        <div className="about-section">
          <h2>Contact Us</h2>
          <p>
            We love hearing from our customers! Whether you have a question about a product, a suggestion for how we can 
            improve, or just want to say hello, we're always happy to hear from you.
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <strong>Email:</strong> support@shopease.com
            </div>
            <div className="contact-item">
              <strong>Phone:</strong> (555) 123-4567
            </div>
            <div className="contact-item">
              <strong>Hours:</strong> Monday-Friday, 9am-5pm EST
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 