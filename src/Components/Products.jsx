import React, { useState , useEffect } from 'react';
import "../style/Products.css";
import {getAvailableProducts } from '../API/productapi';
import Loding from './Loding';
import heart from "../Images/heart.png";
import {auth,db} from "../firebase/authentication";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

// Static products data - Easy to edit and make dynamic later


const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
 const [userWishlist, setUserWishlist] = useState(new Set());


  const productsPerPage = 8;

useEffect(()=>{
  const fetchProducts = async () => {
    try{
      const data = await getAvailableProducts();
      setProductsData(data);
    }
    catch(error){
      console.error("Error fetching products:",error);
    }
    finally{
      setLoading(false);
    }
  };
  fetchProducts();
},[]);

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


// console.log(productsData);

if(loading){
  return <div className='container'><Loding/></div>;
}
  if(productsData.length === 0){
    return <div className="no-products-container">No products found</div>;
  }
  // Pagination settings - Easy to edit
   // Number of products to show per page
  
  
  
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

const toggleWishlist = async (productId) => {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, "users", user.uid);

  setUserWishlist((prev) => {
    const updated = new Set(prev);

    if (updated.has(productId)) {
      updated.delete(productId);
      updateDoc(userRef, {
        wishlist: arrayRemove(productId),
      });
    } else {
      updated.add(productId);
      updateDoc(userRef, {
        wishlist: arrayUnion(productId),
      });
    }

    return updated;
  });
};


  console.log(productsData)
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
                  <span className="product-card-price">₹{product.price}</span>
                  <div className="product-card-actions">
                    {/* ✅ WISHLIST BUTTON */}
                    <button
                    className={`wishlist-icon-btn ${
                      userWishlist.has(product.id) ? "active" : ""
                    }`}
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <img src={heart} alt="Wishlist" className="wishlist-icon" />
                  </button>

                    {/* ✅ ADD TO CART BUTTON */}

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

