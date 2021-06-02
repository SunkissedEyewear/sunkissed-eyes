import React from "react"
import { GatsbyImage, getImageData } from "gatsby-plugin-image"
import { getShopifyImage } from "gatsby-source-shopify"

import { AddToCart } from '../components/add-to-cart'
import { formatPrice } from '../utils/format-price'

import {
  wlItem,
  removeBtn,
  imageWrapper,
  nameAndPrice,
  itemName,
  itemPrice,
  variantName,
  addToCartWrapper
} from "./wl-item.module.scss"

const WishlistItem = ({ itemData, updateWishlist }) => {
  
  const {
    product: { images, priceRangeV2 },
    displayName,
    title,
    id,
    storefrontId,
    availableForSale,
    price: variantPrice,

  } = itemData

  const removeFromWL = () => {
    
    updateWishlist(id)
  }
  
  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    variantPrice
  )

  const imageData = images[0].gatsbyImageData
  const productName = displayName.split("-")[0]
  
  return (
    <div className={wlItem}>
      <button onClick={removeFromWL} className={removeBtn}>
        remove from wishlist &nbsp; <span>&times;</span>
      </button>
      <div className={imageWrapper}>
        <GatsbyImage image={imageData} />
      </div>
      <div className={nameAndPrice}>
        <div className={itemName}>{productName}</div>
        <div className={itemPrice}>{price}</div>
      </div>
      <div className={variantName}>• {title}</div>
      <div className={addToCartWrapper}>
        <AddToCart available={availableForSale} quantity={1} variantId={storefrontId}/>
      </div>
    </div>
  )
}

export default WishlistItem
