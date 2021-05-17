import React from "react"

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
  return (
    <div className={mobileMenu}>
      <div className={menuHeader}>
        <div className={logoWrapper}>
          <Link to="/">
            <div onClick={toggleMenu}>
              <Logo />
            </div>
          </Link>
        </div>
        <div className={cartWrapper}>
          {!menuOpen ? <CartButton /> : <span />}
        </div>
        <MenuButton toggleMenu={toggleMenu} menuOpen={menuOpen} />
      </div>
      {menuOpen && (
        <div className={menuContent}>
          <MobileIcons toggleMenu={toggleMenu} />
          <MobileNavigation toggleMenu={toggleMenu} />
          <SocialLinks classN={mobileSocial} />
        </div>
      )}
    </div>
  )
}
