import { graphql, useStaticQuery, Link } from "gatsby"
import * as React from "react"
import slugify from "@sindresorhus/slugify"
import { navStyle, navLink, activeLink } from "./navigation.module.scss"

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

  return (
    <nav className={navStyle}>
      {/* <nav className={[navStyle, className].join(" ")}> */}
      <Link
        key="shop"
        className={navLink}
        to="/products/"
        activeClassName={activeLink}
      >
        shop
      </Link>
      <Link
        key="collections"
        className={navLink}
        to="/products/"
      >
        collections
      </Link>
      <Link
        key="insta"
        className={navLink}
        to="/products/"
      >
        shop insta
      </Link>
      {productTypes.map((name) => (
        <Link
          key={name}
          className={navLink}
          to={`/products/${slugify(name)}`}
        >
          {name}
        </Link>
      ))}
      <Link
        key="blog"
        className={navLink}
        to="/products/"
      >
        blog
      </Link>
      <Link
        key="face"
        className={navLink}
        to="/products/"
      >
        face shapes
      </Link>
      <Link
        key="contact"
        className={navLink}
        to="/products/"
      >
        contact
      </Link>
    </nav>
  )
}
