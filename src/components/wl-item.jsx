import React from 'react'
import { GatsbyImage } from "gatsby-plugin-image"
import { ProductCard } from './product-card'

const WishlistItem = ({ itemData }) => {
  
  return (
    <div>
      {itemData.displayName}
      {itemData.title}
    </div>
  )
}

export default WishlistItem
