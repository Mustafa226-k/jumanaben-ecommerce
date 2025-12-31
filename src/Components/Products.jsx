import React, { useState } from 'react';
import "../style/Products.css";

// Static products data - Easy to edit and make dynamic later
const productsData = [
  {
    id: 1,
    name: "Elegant Floral Dress",
    price: 89.99,
    category: "Women • Dress",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop"
  },
  {
    id: 2,
    name: "Classic White Shirt",
    price: 49.99,
    category: "Men • Shirt",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&h=500&fit=crop"
  },
  {
    id: 3,
    name: "Denim Jacket Blue",
    price: 79.99,
    category: "Unisex • Jacket",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop"
  },
  {
    id: 4,
    name: "Summer Beach Shorts",
    price: 39.99,
    category: "Men • Shorts",
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=500&fit=crop"
  },
  {
    id: 5,
    name: "Casual T-Shirt",
    price: 29.99,
    category: "Unisex • T-Shirt",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop"
  },
  {
    id: 6,
    name: "Winter Sweater",
    price: 69.99,
    category: "Women • Sweater",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop"
  },
  {
    id: 7,
    name: "Sporty Activewear Set",
    price: 99.99,
    category: "Unisex • Activewear",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop"
  },
  {
    id: 8,
    name: "Formal Black Suit",
    price: 199.99,
    category: "Men • Suit",
    image: "https://images.unsplash.com/photo-1594938291221-94f18dd6d281?w=400&h=500&fit=crop"
  },
  {
    id: 9,
    name: "Elegant Evening Gown",
    price: 149.99,
    category: "Women • Dress",
    image: "https://images.unsplash.com/photo-1566479179817-2788398a8e78?w=400&h=500&fit=crop"
  },
  {
    id: 10,
    name: "Leather Biker Jacket",
    price: 249.99,
    category: "Unisex • Jacket",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop"
  },
  {
    id: 11,
    name: "Vintage Denim Jeans",
    price: 59.99,
    category: "Unisex • Jeans",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop"
  },
  {
    id: 12,
    name: "Cozy Knit Cardigan",
    price: 74.99,
    category: "Women • Cardigan",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop"
  },
  {
    id: 13,
    name: "Business Casual Blazer",
    price: 129.99,
    category: "Men • Blazer",
    image: "https://images.unsplash.com/photo-1594938291221-94f18dd6d281?w=400&h=500&fit=crop"
  },
  {
    id: 14,
    name: "Trendy Crop Top",
    price: 34.99,
    category: "Women • Top",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=500&fit=crop"
  },
  {
    id: 15,
    name: "Comfortable Lounge Pants",
    price: 44.99,
    category: "Unisex • Pants",
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=500&fit=crop"
  },
  {
    id: 16,
    name: "Stylish Maxi Dress",
    price: 94.99,
    category: "Women • Dress",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop"
  },
  {
    id: 17,
    name: "Classic Polo Shirt",
    price: 54.99,
    category: "Men • Shirt",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&h=500&fit=crop"
  },
  {
    id: 18,
    name: "Chic Midi Skirt",
    price: 64.99,
    category: "Women • Skirt",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop"
  }
];

const Products = () => {
  // Pagination settings - Easy to edit
  const productsPerPage = 8; // Number of products to show per page
  
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate pagination
  const totalProducts = productsData.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = productsData.slice(startIndex, endIndex);

  // Handle page navigation
  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="products-section">
      <div className="products-container">
        <div className="products-header">
          <h2 className="products-title">Featured Products</h2>
          <p className="products-subtitle">
            Discover our curated collection of premium fashion pieces designed for every occasion
          </p>
        </div>

        <div className="products-grid">
          {currentProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-img"
                />
                <div className="product-overlay">
                  <button className="quick-view-btn">Quick View</button>
                </div>
              </div>

              <div className="product-card-info">
                <p className="product-card-category">{product.category}</p>
                <h3 className="product-card-name">{product.name}</h3>
                <div className="product-card-footer">
                  <span className="product-card-price">${product.price}</span>
                  <button className="add-to-cart-icon-btn" aria-label="Add to cart">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination-container">
            <button
              className="pagination-btn pagination-prev"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Previous</span>
            </button>

            <div className="pagination-pages">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  className={`pagination-page-btn ${currentPage === pageNumber ? 'active' : ''}`}
                  onClick={() => handlePageClick(pageNumber)}
                  aria-label={`Go to page ${pageNumber}`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>

            <button
              className="pagination-btn pagination-next"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <span>Next</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;

