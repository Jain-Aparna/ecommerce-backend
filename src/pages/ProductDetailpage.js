import React from 'react'
import ProductDetails from '../features/product-list/componenets/ProductDetails'
import Navbar from '../features/navbar/Navbar'
import Footer from '../features/common/Footer'

const ProductDetailspage = () => {
  return (
    <div>
        <Navbar>
      <ProductDetails/>
      </Navbar>
      <Footer/>
    </div>
  )
}

export default ProductDetailspage
