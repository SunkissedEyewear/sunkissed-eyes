import React, { useRef } from "react"
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';

import { SkipNavContent, SkipNavLink } from "../components/skip-nav"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { Seo } from "../components/seo"
import { NavLeft } from '../components/nav-left';
import { NavRight } from '../components/nav-right';

import { layout, scrollWrap } from './index.module.scss';
import '../styles/locomotive-scroll.css';


export default function Layout({ children }) {
  const containerRef = useRef(null)

  return (
    <div className={layout}>
      <Seo />
      <SkipNavLink />
      <NavLeft />
      <LocomotiveScrollProvider
        options={{ smooth: true }}
        containerRef={containerRef}
      >
        <div className={scrollWrap} data-scroll-container ref={containerRef}>
          {/* <SkipNavContent>{children}</SkipNavContent> */}
          <main>{children}</main>
        </div>
      </LocomotiveScrollProvider>
      <NavRight />
    </div>
  )
}
