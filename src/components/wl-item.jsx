import React from "react"
import { GatsbyImage, getImageData } from "gatsby-plugin-image"
import { getShopifyImage } from "gatsby-source-shopify"
import { ProductCard } from "./product-card"

import {
  wlItem,
  removeBtn,
  imageWrapper,
  nameAndPrice,
  itemName,
  itemPrice,
  variantName,
} from "./wl-item.module.scss"

const WishlistItem = ({ itemData, updateWishlist }) => {
  
  const {
    product: { images },
    displayName,
    title,
    id,
    price,
  } = itemData

  const testRemoveFromWL = () => {
    
    updateWishlist(id)
  }
  

  const imageData = images[0].gatsbyImageData
  const productName = displayName.split("-")[0]
  

  return (
    <div className={wlItem}>
      <button onClick={testRemoveFromWL} className={removeBtn}>
        remove from wishlist &nbsp; <span>&times;</span>
      </button>
      <div className={imageWrapper}>
        <GatsbyImage image={imageData} />
      </div>
      <div className={nameAndPrice}>
        <div className={itemName}>{productName}</div>
        <div className={itemPrice}>${price}</div>
      </div>
      <div className={variantName}>• {title}</div>
    </div>
  )
}

export default WishlistItem
