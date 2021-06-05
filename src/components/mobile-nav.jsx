import { graphql, useStaticQuery, Link } from "gatsby"
import * as React from "react"
import slugify from "@sindresorhus/slugify"
import { mobileNavStyle, navLink, activeLink } from "./mobile-nav.module.scss"

export function MobileNavigation({ toggleMenu }) {
  const {
    allShopifyProduct: { productTypes },
  } = useStaticQuery(graphql`
    query {
      allShopifyProduct {
        productTypes: distinct(field: productType)
      }
    }
  `)

  return (
    <nav className={mobileNavStyle} onClick={toggleMenu} >
      {/* <nav className={[navStyle, className].join(" ")}> */}
      <Link
        key="All"
        className={navLink}
        to="/products/"
        activeClassName={activeLink}
      >
        shop
      </Link>
      <Link
        key="All"
        className={navLink}
        to="/products/"
        activeClassName={activeLink}
      >
        collections
      </Link>
      <Link
        key="All"
        className={navLink}
        to="/products/"
        activeClassName={activeLink}
      >
        shop insta
      </Link>
      {/* {productTypes.map((name) => (
        <Link
          key={name}
          className={navLink}
          to={`/products/${slugify(name)}`}
          activeClassName={activeLink}
        >
          {name}
        </Link>
      ))} */}
      <Link
        key="All"
        className={navLink}
        to="/products/"
        activeClassName={activeLink}
      >
        face shapes
      </Link>
      <Link
        key="All"
        className={navLink}
        to="/products/"
        activeClassName={activeLink}
      >
        contact
      </Link>
    </nav>
  )
}
