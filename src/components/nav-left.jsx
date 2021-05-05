import * as React from "react"
import { Link } from "gatsby"
import { StoreContext } from "../context/store-context"
import Logo from "../icons/logo"
import { Navigation } from "./navigation"
import { CartButton } from "./cart-button"
import SearchIcon from "../icons/search"
import { Toast } from "./toast"
import {
  navLeft,
  logo as logoCss,
  searchButton,
  nav,
} from "./nav-left.module.scss"

export function NavLeft() {
  const { checkout, loading, didJustAddToCart } = React.useContext(StoreContext)

  const items = checkout ? checkout.lineItems : []

  const quantity = items.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  return (
    <div className={navLeft}>
      <Link to="/" className={logoCss}>
        <Logo />
      </Link>
      <Navigation className={nav} />
    </div>
  )
}
