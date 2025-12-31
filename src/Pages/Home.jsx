import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Products from '../Components/Products'
import Footer from '../Components/Footer'

export default function Home() {
  return (
    <>
      <Navbar/>

      <div className="container">
        <Hero/>
      </div>

      <Products/>

      <Footer/>
    </>
  )
}
