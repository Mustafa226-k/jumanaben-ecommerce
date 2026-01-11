import React from "react";
import user from "../Images/user.png";
import heart from "../Images/heart.png";
import shoppingCart from "../Images/shopping-cart.png";
import logo from "../Images/bussiness_logo.jpeg";
import "../style/Images.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="Mustafa Collection Logo"
            className="navbar-logo"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            Home
          </a>
        </li> */}

            {/* <li className="nav-item">
          <a className="nav-link" href="#">
            Products
          </a>
        </li> */}

            <li className="nav-item">
              <Link className="nav-link" to="/categories">
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/wishlist">
                <img
                  src={heart}
                  alt="Wishlist"
                  title="Wishlist"
                  className="navbar-icon"
                />
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <img
                  src={shoppingCart}
                  alt="Cart"
                  title="Shopping Cart"
                  className="navbar-icon"
                />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <img
                  src={user}
                  alt="Profile"
                  title="Profile"
                  className="navbar-icon navbar-avatar"
                />
              </a>
            </li>
          </ul>

          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-dark" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
