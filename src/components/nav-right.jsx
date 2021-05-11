import * as React from "react"
import { Link } from "gatsby"
import { StoreContext } from "../context/store-context"
import Logo from "../icons/logo"
import { Navigation } from "./navigation"
import { CartButton } from "./cart-button"
import SearchIcon from "../icons/search"
import WishlistIcon from "../icons/wishlist"
import FacebookIcon from "../icons/facebook"
import InstagramIcon from "../icons/instagram"
import PinterestIcon from "../icons/pinterest"
import { Toast } from "./toast"
import {
  navRight,
  logo as logoCss,
  navRightButton,
  nav,
  internal,
  social,
  account,
  rotateWrapper
} from "./nav-right.module.scss"

export function NavRight() {
  const { checkout, loading, didJustAddToCart } = React.useContext(StoreContext)

  const items = checkout ? checkout.lineItems : []

  const quantity = items.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  return (
    <div className={navRight}>
      <div className={internal}>
        <Link to="/search" className={navRightButton}>
          <SearchIcon />
        </Link>
        <CartButton quantity={quantity} />
        <Toast show={loading || didJustAddToCart}>
          {!didJustAddToCart ? (
            "Updating…"
          ) : (
            <>
              Added to cart{" "}
              <svg
                width="14"
                height="14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.019 10.492l-2.322-3.17A.796.796 0 013.91 6.304L6.628 9.14a1.056 1.056 0 11-1.61 1.351z"
                  fill="#fff"
                />
                <path
                  d="M5.209 10.693a1.11 1.11 0 01-.105-1.6l5.394-5.88a.757.757 0 011.159.973l-4.855 6.332a1.11 1.11 0 01-1.593.175z"
                  fill="#fff"
                />
                <path
                  d="M5.331 7.806c.272.326.471.543.815.163.345-.38-.108.96-.108.96l-1.123-.363.416-.76z"
                  fill="#fff"
                />
              </svg>
            </>
          )}
        </Toast>
        <div className={account}>
          <div className={rotateWrapper}>account</div>
        </div>
        <Link to="/search" className={navRightButton}>
          <WishlistIcon />
        </Link>
      </div>
      <div className={social}>
        <a
          className={navRightButton}
          href="https://www.pinterest.com/the_Shadz/_shop/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <PinterestIcon />
        </a>
        <a
          className={navRightButton}
          href="https://www.instagram.com/shadzsunglasses/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon />
        </a>
        <a
          className={navRightButton}
          href="https://www.facebook.com/shadzsunglasses/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookIcon />
        </a>
      </div>
    </div>
  )
}
