import React from 'react'
import ProductList from '../features/product-list/componenets/ProductList'
import Navbar from '../features/navbar/Navbar'
import Footer from '../features/common/Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
        <ProductList/>
        <Footer/>

    </div>
  )
}

export default Home
