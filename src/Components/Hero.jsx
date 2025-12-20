import React, { useState } from 'react';
import "../style/hero.css"


const Hero = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  // Sample products - you can replace with your actual data
  const products = [
    {
      id: 1,
      name: "Nerdy Sparkling Short Sleeve T-Shirt Black",
      price: 150,
      category: "Apparel • Shirt",
      image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=500&fit=crop"
    },
    {
      id: 2,
      name: "Urban Street Style Hoodie",
      price: 180,
      category: "Apparel • Hoodie",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop"
    },
    {
      id: 3,
      name: "Classic Denim Jacket",
      price: 220,
      category: "Apparel • Jacket",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop"
    }
  ];

  const handlePrevProduct = () => {
    setCurrentProductIndex((prev) =>
      prev === 0 ? products.length - 1 : prev - 1
    );
  };

  const handleNextProduct = () => {
    setCurrentProductIndex((prev) =>
      prev === products.length - 1 ? 0 : prev + 1
    );
  };

  const currentProduct = products[currentProductIndex];

  return (
    <section className="hero-section">
      <div className="hero-background-overlay"></div>

      <div className="hero-container">
        {/* Main Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            Unleash Your Style with
            <br />
            Our New Collection
          </h1>
          <p className="hero-description">
            Unleash your style and express individuality with our new collection, designed to elevate
            your wardrobe and make a bold statement wherever you go.
          </p>
        </div>

        {/* Product Card */}
        <div className="hero-product-card">
          <div className="product-card-header">
            <span className="product-card-title">New Collection</span>
            <div className="product-navigation">
              <button
                className="nav-btn nav-btn-prev"
                onClick={handlePrevProduct}
                aria-label="Previous product"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                className="nav-btn nav-btn-next"
                onClick={handleNextProduct}
                aria-label="Next product"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          <div className="product-image-container">
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              className="product-image"
            />
          </div>

          <div className="product-info">
            <div className="product-details">
              <h3 className="product-name">{currentProduct.name}</h3>
              <span className="product-price">${currentProduct.price}</span>
            </div>
            <p className="product-category">{currentProduct.category}</p>
          </div>

          <button className="add-to-cart-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Bottom Features */}
      <div className="hero-features">
        <div className="feature-item">
          <div className="feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="feature-text">Keep Stylish</span>
        </div>

        <div className="feature-item">
          <div className="feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20.59 13.41L13.42 20.58C13.2343 20.766 13.0137 20.9135 12.7709 21.0141C12.5281 21.1148 12.2678 21.1666 12.005 21.1666C11.7422 21.1666 11.4819 21.1148 11.2391 21.0141C10.9963 20.9135 10.7757 20.766 10.59 20.58L2 12V2H12L20.59 10.59C20.9625 10.9647 21.1716 11.4716 21.1716 12C21.1716 12.5284 20.9625 13.0353 20.59 13.41Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 7H7.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="feature-text">Fashion for Every Moment</span>
        </div>

        <div className="feature-item">
          <div className="feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="feature-text">Trendy Fashion</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
