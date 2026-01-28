import React, { useState, useEffect, useMemo } from "react";
import "../style/Category.css";
import { getAvailableProducts } from "../API/productapi";
import Loding from "../Components/Loding";
import heart from "../Images/heart.png";
import { auth, db } from "../firebase/authentication";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useSearchParams } from "react-router-dom";

const Category = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userWishlist, setUserWishlist] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Fetch all available products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAvailableProducts();
        setProductsData(data);

        setCategories([
          "All",
          ...new Set(data.map((p) => p.category || "Uncategorized")),
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  //handle URL
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory("All");
    }
  }, [searchParams]);

  // Fetch user wishlist
  useEffect(() => {
    const fetchUserWishlist = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        setUserWishlist(new Set(snap.data().wishlist || []));
      }
    };

    fetchUserWishlist();
  }, []);

  // Add to wishlist
  const handleAddToWishlist = async (productId) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please login to add items to wishlist");
      return;
    }

    const userRef = doc(db, "users", user.uid);

    try {
      await updateDoc(userRef, {
        wishlist: arrayUnion(productId),
      });

      setUserWishlist((prev) => new Set([...prev, productId]));
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  // Remove from wishlist
  const handleRemoveFromWishlist = async (productId) => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    try {
      await updateDoc(userRef, {
        wishlist: arrayRemove(productId),
      });

      setUserWishlist((prev) => {
        const updated = new Set(prev);
        updated.delete(productId);
        return updated;
      });
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return productsData;
    }

    return productsData.filter(
      (product) => product.category === selectedCategory
    );
  }, [productsData, selectedCategory]);

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const currentProducts = filteredProducts.slice(startIndex, endIndex);

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

useEffect(() => {
  setCurrentPage(1);
}, [selectedCategory]);

  if (loading) {
    return (
      <div className="container">
        <Navbar />
        <Loding />
        <Footer />
      </div>
    );
  }

  // Filter products by selected category

  return (
    <>
      <Navbar />

      <div className="category-section container">
        <div className="category-container">
          {/* Header */}
          <div className="category-header">
            <h1 className="category-title">Shop by Category</h1>
            <p className="category-subtitle">
              Browse our collection organized by categories
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-tab ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  if (category === "All") {
                    setSearchParams({});
                  } else {
                    setSearchParams({ category });
                  }
                }}
              >
                {category}
                <span className="tab-count">
                  (
                  {category === "All"
                    ? productsData.length
                    : productsData.filter(
                        (p) => (p.category || "Uncategorized") === category
                      ).length}
                  )
                </span>
              </button>
            ))}
          </div>

          {/* Category Title */}
          {selectedCategory !== "All" && (
            <div className="selected-category-header">
              <h2>{selectedCategory}</h2>
              <p>{filteredProducts.length} products found</p>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="no-products-container">
              No products found in this category
            </div>
          ) : (
            <div className="category-products-grid">
              {currentProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image-wrapper">
                    <img
                      src={product.image}
                      alt={product.title || product.name}
                      className="product-img"
                    />
                    <div className="product-overlay">
                      <button className="quick-view-btn">Quick View</button>
                    </div>
                  </div>

                  <div className="product-card-info">
                    <p className="product-card-category">
                      {product.category || "Uncategorized"}
                    </p>
                    <h3 className="product-card-name">
                      {product.title || product.name}
                    </h3>
                    <div className="product-card-footer">
                      <span className="product-card-price">
                        ₹{product.price}
                      </span>
                      <div className="product-card-actions">
                        <button
                          className={`wishlist-icon-btn ${
                            userWishlist.has(product.id) ? "active" : ""
                          }`}
                          onClick={() =>
                            userWishlist.has(product.id)
                              ? handleRemoveFromWishlist(product.id)
                              : handleAddToWishlist(product.id)
                          }
                        >
                          <img
                            src={heart}
                            alt="Wishlist"
                            className="wishlist-icon"
                          />
                        </button>

                        <button
                          className="add-to-cart-icon-btn"
                          aria-label="Add to cart"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
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
                </div>
              ))}
            </div>
          )}
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
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Previous</span>
            </button>

            <div className="pagination-pages">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    className={`pagination-page-btn ${
                      currentPage === pageNumber ? "active" : ""
                    }`}
                    onClick={() => handlePageClick(pageNumber)}
                    aria-label={`Go to page ${pageNumber}`}
                  >
                    {pageNumber}
                  </button>
                )
              )}
            </div>

            <button
              className="pagination-btn pagination-next"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <span>Next</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Category;
