import React, { useCallback, useEffect, useRef, useState } from "react"
// import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
// import LocomotiveScroll from 'locomotive-scroll';

import { SkipNavLink } from "../components/skip-nav"
import { Seo } from "../components/seo"
import { NavLeft } from '../components/nav-left';
import { NavRight } from '../components/nav-right';
import { MobileMenu } from '../components/parent-mobile-menu';

import { useWindowSize } from '../utils/hooks';
import { layout, scrollWrap, mobileMenu } from './index.module.scss';
import '../styles/locomotive-scroll.css';


export default function Layout({ children }) {
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // set breakpoint for JS
    const tabBP = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--tablet",
        10
      )
    )
    setIsMobile(window.innerWidth <= tabBP)
  }, [isMobile])

  return (
    <div className={layout}>
      <Seo />
      <SkipNavLink />
      {!isMobile ? (
        <NavLeft />
      ) : (
        <MobileMenu toggleMenu={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen}/>
      )}
      <div className={scrollWrap}  data-scroll-container ref={containerRef}>
        <main>{children}</main>
      </div>
      {!isMobile && <NavRight />}
    </div>
  )
}
