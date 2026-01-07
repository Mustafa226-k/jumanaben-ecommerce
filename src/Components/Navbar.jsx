import React from 'react'
import user from "../Images/user.png";
import "../style/Images.css";

export default function Navbar() {
  return (
    
        <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">

    <a className="navbar-brand" href="#">
      Mustafa Collection
    </a>

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
          <a className="nav-link" href="#">
            Women
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Kids
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Your Best Work
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            WishList
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Bag
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
           <img src={user} alt="Profile" className="navbar-user" />
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

    
  )
}
