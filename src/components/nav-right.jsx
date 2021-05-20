import * as React from "react"
import { Link } from "gatsby"

// user info
import { useAuth0 } from "@auth0/auth0-react"

// store context
import { StoreContext } from "../context/store-context"

// components
import Logo from "../icons/logo"
import { Navigation } from "./navigation"
import { CartButton } from "./cart-button"
import SearchIcon from "../icons/search"
import WishlistIcon from "../icons/wishlist"
import SocialLinks from "./social-links"
import { Toast } from "./toast"

// styles
import {
  navRight,
  logo as logoCss,
  navRightButton,
  nav,
  internal,
  social,
  account,
  rotateWrapper,
} from "./nav-right.module.scss"

export function NavRight() {
  const { checkout, loading, didJustAddToCart } = React.useContext(StoreContext)

  const items = checkout ? checkout.lineItems : []

  const quantity = items.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  const { user, isAuthenticated, loginWithRedirect, isLoading } = useAuth0()

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
        <Link to="/account" className={account}>
          <div className={rotateWrapper}>
            { isLoading 
              ? " " 
              : (isAuthenticated  
                ? "account" 
                : "login")}
          </div>
        </Link>
        <Link to="/wishlist" className={navRightButton}>
          <WishlistIcon />
        </Link>
      </div>
      <SocialLinks />
    </div>
  )
}
