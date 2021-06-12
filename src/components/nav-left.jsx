import * as React from "react"
import { Link } from "gatsby"
import Logo from "../icons/logo"
import { Navigation } from "./navigation"

import {
  navLeft,
  logo as logoCss,
  nav,
} from "./nav-left.module.scss"

export function NavLeft() {

  return (
    <div className={navLeft}>
      <Link to="/" className={logoCss}>
        <Logo />
      </Link>
      <Navigation className={nav} />
    </div>
  )
}
