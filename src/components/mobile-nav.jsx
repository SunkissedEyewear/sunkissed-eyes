import { graphql, useStaticQuery, Link } from "gatsby"
import React, { useState } from "react"
import slugify from "@sindresorhus/slugify"
import {
  mobileNavStyle,
  navLink,
  activeLink,
  dropDownBtn,
} from "./mobile-nav.module.scss"

export function MobileNavigation({ toggleMenu, menuOpen }) {
  const {
    allShopifyProduct: { productTypes },
  } = useStaticQuery(graphql`
    query {
      allShopifyProduct {
        productTypes: distinct(field: productType)
      }
    }
  `)

  const [typesVisible, setTypesVisible] = useState(false)

  const openTypesMenu = (e) => {
    e.stopPropagation()
    
    setTypesVisible(!typesVisible)
  }

  const menuToggleTest = (params) => {
    setTimeout(() => {
      toggleMenu()
    }, 200);
  }
  
  const activeDropDown = {
    background: typesVisible ? "var(--primary)" : "transparent"
  }

  return (
    <nav className={mobileNavStyle} onTouchStart={menuToggleTest}>
      {/* <nav className={[navStyle, className].join(" ")}> */}
      <Link
        key="products"
        className={navLink}
        to="/products/"
        activeClassName={activeLink}
      >
        shop{" "}
        <span onTouchStartCapture={openTypesMenu} className={dropDownBtn} style={activeDropDown}>
          &#9662;
        </span>
      </Link>
      {typesVisible &&
        productTypes.map((name) => (
          <Link
            key={name}
            className={navLink}
            to={`/products/${slugify(name)}`}
          >
            <span style={{ transform: "scale(.75)", padding: "3px" }}>
              {" "}
              &nbsp;
            </span>{" "}
            {name}
          </Link>
        ))}
      <Link
        key="collections"
        className={navLink}
        to="/products/"
        activeClassName={activeLink}
      >
        collections
      </Link>
      <Link
        key="insta"
        className={navLink}
        to="/shopInsta/"
        activeClassName={activeLink}
      >
        shop insta
      </Link>
      <Link
        key="faces"
        className={navLink}
        to="/products/"
        activeClassName={activeLink}
      >
        face shapes
      </Link>
      <Link
        key="contact"
        className={navLink}
        to="/products/"
        activeClassName={activeLink}
      >
        contact
      </Link>
    </nav>
  )
}
