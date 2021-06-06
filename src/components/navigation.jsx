import { graphql, useStaticQuery, Link } from "gatsby"
import React, { useState } from "react"
import slugify from "@sindresorhus/slugify"
import { navStyle, navLink, activeLink, dropDownBtn } from "./navigation.module.scss"

export function Navigation({ className }) {
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
  
  const typesVisToggle = typesVisible 
    ? {
      visibility: "visible",
      height: "var(--size-input)"
    } : {
      visibility: "hidden",
      height: 0
    }

  return (
    <nav className={navStyle}>
      {/* <nav className={[navStyle, className].join(" ")}> */}
      <nav
        className={navStyle}
        onMouseOverCapture={() => setTypesVisible(true)}
        onMouseOutCapture={() => setTypesVisible(false)}
      >
        <Link
          key="shop"
          className={navLink}
          to="/products/"
          activeClassName={activeLink}
        >
          shop <span className={dropDownBtn}>&#9662;</span>
        </Link>
        {productTypes.map((name) => (
          <Link
            key={name}
            className={navLink}
            style={typesVisToggle}
            to={`/products/${slugify(name)}`}
          >
            <span style={{ transform: "scale(.75)", padding: "3px" }} >{" "}&nbsp;</span> {name}
          </Link>
        ))}
      </nav>
      <Link key="collections" className={navLink} to="/products/">
        collections
      </Link>
      <Link
        key="shopInsta"
        className={navLink}
        activeClassName={activeLink}
        to="/shopInsta/"
      >
        shopInsta
      </Link>

      <Link key="blog" className={navLink} to="/products/">
        blog
      </Link>
      <Link key="face" className={navLink} to="/products/">
        face shapes
      </Link>
      <Link key="contact" className={navLink} to="/products/">
        contact
      </Link>
    </nav>
  )
}
