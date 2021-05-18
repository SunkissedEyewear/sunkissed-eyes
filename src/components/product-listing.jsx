import * as React from "react"
import { ProductCard } from "./product-card"
import { listingContainerStyle } from "./product-listing.module.scss"

export function ProductListing({ products }) {
  console.log('products: ', products);
  
  
  return (
    <div className={listingContainerStyle}>
      {products.map((p) => (
        <ProductCard product={p} key={p.id} />
      ))}
    </div>
  )
}
