import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import WishlistItem from "./wl-item"

import {
  wishlistContainer,
  trendingLink,
  emptyWishlist,
  emptyListHeader,
  headerContainer,
  listHeader,
} from "./wishlist-items.module.scss"

const WishlistItems = ({ wishlist, updateWishlist, userName }) => {
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
    <>
      <div className={headerContainer}>
        <h1 className={listHeader}>{userName}'s Wishlist</h1>
        {/* <h3 className={listSubHeader}>Items in your wishlist</h3> */}
      </div>
      {userWishlist.length > 0 ? (
        <div className={wishlistContainer}>
          {userWishlist.map((item) => (
            <WishlistItem
              itemData={item.node}
              updateWishlist={updateWishlist}
            />
          ))}
        </div>
      ) : (
        <div className={emptyWishlist}>
          <h2 className={emptyListHeader}>Welcome, {userName}!</h2>
          <h3>
            Looks like your wishlist is empty. <br /> Sometimes it’s hard to
            choose. Maybe this helps :)
          </h3>
          <Link to="/search?s=BEST_SELLING" className={trendingLink}>
            View trending products
          </Link>
        </div>
      )}
    </>
  )
}

export default WishlistItems
