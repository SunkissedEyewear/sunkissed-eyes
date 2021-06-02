import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import WishlistItem from "./wl-item"

import { wishlistContainer } from "./wishlist-items.module.scss"

const WishlistItems = ({ wishlist, updateWishlist }) => {
  
  const {
    allShopifyProductVariant: { edges },
  } = useStaticQuery(graphql`
    query MyQuery {
      allShopifyProductVariant {
        edges {
          node {
            id
            storefrontId
            displayName
            title
            price
            availableForSale
            product {
              priceRangeV2 {
                maxVariantPrice {
                  currencyCode
                  amount
                }
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images {
                gatsbyImageData(layout: CONSTRAINED, width: 300)
              }
            }
          }
        }
      }
    }
  `)

  const userWishlist = edges.filter((edge) => wishlist.includes(edge.node.id))

  return (
    <div className={wishlistContainer}>
      {userWishlist.map((item) => (
        <WishlistItem itemData={item.node} updateWishlist={updateWishlist}/>
      ))}
    </div>
  )
}

export default WishlistItems
