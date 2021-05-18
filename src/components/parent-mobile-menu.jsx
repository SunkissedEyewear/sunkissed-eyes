import React from "react"
import { StoreContext } from "../context/store-context"

import {
  mobileMenu,
  mobileSocial,
  menuButton,
  menuContent,
  menuHeader,
  closeButton,
  logoWrapper,
  cartWrapper,
} from "./mobile-menu.module.scss"
import Logo from "../icons/logo"
import { Toast } from "./toast"
import { CartButton } from "./cart-button"
import { Navigation } from "./navigation"
import { NavRight } from "./nav-right"
import { MobileIcons } from './mobile-icons'
import { MobileNavigation } from './mobile-nav'
import SocialLinks from "./social-links"
import { Link } from "gatsby"

const MenuButton = ({ toggleMenu, menuOpen }) => {
  return (
    <div
      className={`${menuButton} ${menuOpen && closeButton}`}
      onClick={toggleMenu}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export const MobileMenu = ({ menuOpen, toggleMenu }) => {
    const { checkout, loading, didJustAddToCart } = React.useContext(
      StoreContext
    )

    const items = checkout ? checkout.lineItems : []

    const quantity = items.reduce((total, item) => {
      return total + item.quantity
    }, 0)
  
  const conditionalClose = () => {
    if (menuOpen) {
      toggleMenu()
    } else {
      return
    }
  }
  
  return (
    <>
      <div className={mobileMenu}>
        <div className={menuHeader}>
          <div className={logoWrapper}>
            <Link to="/">
              <div onClick={conditionalClose}>
                <Logo />
              </div>
            </Link>
          </div>
          <div className={cartWrapper}>
            {!menuOpen ? <CartButton quantity={quantity} /> : <span />}
          </div>
          <MenuButton toggleMenu={toggleMenu} menuOpen={menuOpen} />
        </div>
        {menuOpen && (
          <div className={menuContent}>
            <MobileIcons toggleMenu={conditionalClose} />
            <MobileNavigation toggleMenu={conditionalClose} />
            <SocialLinks classN={mobileSocial} />
          </div>
        )}
      </div>
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
    </>
  )
}
