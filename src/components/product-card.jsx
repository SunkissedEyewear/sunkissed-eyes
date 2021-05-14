import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { getShopifyImage } from "gatsby-source-shopify"
import { formatPrice } from "../utils/format-price"
import {
  productCardStyle,
  productHeadingStyle,
  productImageStyle,
  productDetailsStyle,
  productVendorStyle,
  hoverImage,
  productPrice,
} from "./product-card.module.scss"

import { searchProductImage, defaultProductImage } from '../pages/search-page.module.scss'

export function ProductCard({ product }) {
  const {
    title,
    priceRangeV2,
    slug,
    images: [firstImage],
    images: [, , , thirdImage],
    vendor,
    storefrontImages,
  } = product
  
  console.log('storefrontImages from product card: ', storefrontImages);
  console.log('firstImage from product card: ', firstImage);
  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    priceRangeV2.minVariantPrice.amount
  )

  let storefrontImageData = {}
  let modelImageData = {}
  
  if (storefrontImages) {
    const storefrontImage = storefrontImages.edges[0].node
    const modelImage = storefrontImages.edges[0].node 
    try {
      storefrontImageData = getShopifyImage({
        image: storefrontImage,
        layout: "fluid",
        width: 200,
        height: 200,
      })
    } catch (e) {
      
    }
    try {
      modelImageData = getShopifyImage({
        image: modelImage,
        layout: "fluid",
        width: 400,
        height: 400,
      })
    } catch (e) {
      
    }
  }


  return (
    <Link
      className={productCardStyle}
      to={slug}
      aria-label={`View ${title} product page`}
    >
      <div className={productImageStyle} data-name="product-image-box">
        <GatsbyImage
          alt={firstImage?.altText ?? title}
          imgClassName={firstImage ? defaultProductImage : searchProductImage}
          image={firstImage?.gatsbyImageData ?? storefrontImageData}
        />
      </div>
      <div className={productDetailsStyle}>
        {/* <div className={productVendorStyle}>{vendor}</div> */}
        <h2 as="h2" className={productHeadingStyle}>
          {title}
        </h2>
        <div className={productPrice}>{price}</div>
      </div>
      <div className={hoverImage}>
        <GatsbyImage
          alt={thirdImage?.altText ?? null}
          image={thirdImage?.gatsbyImageData ?? null}
        />
      </div>
    </Link>
  )
}

export const query = graphql`
  fragment ProductCard on ShopifyProduct {
    id
    title
    slug: gatsbyPath(
      filePath: "/products/{ShopifyProduct.productType}/{ShopifyProduct.handle}"
    )
    images {
      altText
      gatsbyImageData(aspectRatio: 1, width: 640)
    }
    priceRangeV2 {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    vendor
  }
`
