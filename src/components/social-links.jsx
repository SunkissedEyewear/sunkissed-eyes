import React from 'react'

import FacebookIcon from "../icons/facebook"
import InstagramIcon from "../icons/instagram"
import PinterestIcon from "../icons/pinterest"

import { social, navRightButton as linkButton } from './nav-right.module.scss'

const SocialLinks = ({ classN }) => {
  return (
    <div className={!classN ? social : classN}>
      <a
        className={linkButton}
        href="https://www.pinterest.com/the_Shadz/_shop/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <PinterestIcon />
      </a>
      <a
        className={linkButton}
        href="https://www.instagram.com/shadzsunglasses/?hl=en"
        target="_blank"
        rel="noopener noreferrer"
      >
        <InstagramIcon />
      </a>
      <a
        className={linkButton}
        href="https://www.facebook.com/shadzsunglasses/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FacebookIcon />
      </a>
    </div>
  )
}

export default SocialLinks
