import React, { useState, useEffect } from 'react';
import "../style/Wishlist.css";
import { auth, db } from "../firebase/authentication";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import Loding from '../Components/Loding';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import heart from "../Images/heart.png";
import { getAvailableProducts } from '../API/productapi';

const Wishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userWishlist, setUserWishlist] = useState(new Set());

  // Fetch user's wishlist on component mount
 useEffect(() => {
  const fetchWishlistProducts = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      // 1️⃣ Get user wishlist IDs
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        setLoading(false);
        return;
      }

      const wishlistIds = snap.data().wishlist || [];
      const wishlistSet = new Set(wishlistIds);
      setUserWishlist(wishlistSet);

      // 2️⃣ Get all available products
      const allProducts = await getAvailableProducts();

      // 3️⃣ Filter only wishlisted products
      const filteredProducts = allProducts.filter((product) =>
        wishlistSet.has(product.id)
      );

      // 4️⃣ Save real product objects
      setWishlistProducts(filteredProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching wishlist products:", error);
      setLoading(false);
    }
  };

  fetchWishlistProducts();
}, []);


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

    setWishlistProducts((prev) =>
      prev.filter((product) => product.id !== productId)
    );
  } catch (error) {
    console.error("Error removing from wishlist:", error);
  }
};


  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="wishlist-loading">
          <Loding />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <Navbar />
      <section className="wishlist-section">
        <div className="wishlist-background-overlay"></div>
        <div className="wishlist-container">
          {/* Wishlist Header */}
          <div className="wishlist-header">
            <h1 className="wishlist-title">My Wishlist</h1>
            <p className="wishlist-subtitle">
              {wishlistProducts.length === 0
                ? "Your wishlist is empty"
                : `You have ${wishlistProducts.length} item${wishlistProducts.length !== 1 ? "s" : ""} in your wishlist`}
            </p>
          </div>

          {/* Wishlist Items Grid */}
          {wishlistProducts.length === 0 ? (
            <div className="empty-wishlist">
              <div className="empty-wishlist-icon">
                <img src={heart} alt="Empty wishlist" />
              </div>
              <h2>No Items Yet</h2>
              <p>Start adding your favorite products to your wishlist!</p>
            </div>
          ) : (
            <div className="wishlist-grid">
              {wishlistProducts.map((product) => (
             <div key={product.id} className="wishlist-card">
                  {/* Card Image Placeholder */}
                  <div className="wishlist-card-image">
                    <div className="image-placeholder">
                     <img
                      src={product.image}
                      alt={product.name}
                      className="wishlist-product-img"
                    />
                    </div>
                    <div className="wishlist-card-overlay">
                      <button className="quick-view-wishlist-btn">
                        Quick View
                      </button>
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="wishlist-card-info">
                    <p className="wishlist-card-category">{product.category}</p>
                    <h3 className="wishlist-card-name">{product.name}</h3>
                    
                    <div className="wishlist-card-footer">
                      <span className="wishlist-card-price">₹{product.price}</span>
                      <button
                        className="wishlist-remove-btn"
                        onClick={() => handleRemoveFromWishlist(product.id)}
                        title="Remove from wishlist"
                      >
                        <img src={heart} alt="Remove" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Wishlist;
