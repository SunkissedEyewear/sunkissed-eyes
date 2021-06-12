import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import gsap from 'gsap'


import { AddToCart } from "../components/add-to-cart"
import { CrossIcon } from "../icons/cross"
import InstagramIcon from "../icons/instagram"
import PinterestIcon from "../icons/pinterest"
import FacebookIcon from "../icons/facebook"
import { LinkIcon } from "../icons/link"

import {
  instaContainer,
  instaPost,
  instaModal,
  postImage,
  detailsSection,
  closeButton,
  product,
  productImage,
  productDetails,
  itemName,
  variantName,
  price,
  addToCart,
  postContent,
  postMeta,
  postUser,
  postTime,
  shareIcons,
  // TODO - move the below to separate module
  mobileInstaModal,
  modalShade,
  mImageSection,
  mCloseButton,
  mPostImage,
  mProductSection,
  mProductImage,
  mProductDetails,
  mAddToCart,
  mName,
  mPrice,
  mPostCaption,
  mPostMeta,
  mShareSection,
} from "./shopInsta.module.scss"


// TODO move to separate component
export const InstaModal = ({ hideModal, post, getProductFromPost }) => {
  const productInPost = getProductFromPost(post)[0].node

  const postImageData = getImage(
    post.localImage.childImageSharp.gatsbyImageData
  )
  const productImageData = getImage(
    productInPost.product.images[0].gatsbyImageData
  )

  // close modal with esc key
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        hideModal()
      }
    }
    window.addEventListener("keydown", close)
    return () => window.removeEventListener("keydown", close)
  }, [hideModal])

  // set mobile breakpoint for alternate modal component
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const tabBP = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--tablet",
        10
      )
    )
    setIsMobile(window.innerWidth <= tabBP)
  }, [isMobile])

  const timeComponents = post.timestamp.split("-")

  return (
    <>
      {!isMobile ? (
        <div className={instaModal}>
          <section className={postImage}>
            <GatsbyImage alt={post.caption} image={postImageData} />
          </section>
          <section className={detailsSection}>
            <div className={product}>
              <div className={closeButton} onClick={hideModal}>
                <CrossIcon />
              </div>
              <div className={productImage}>
                <GatsbyImage
                  alt={productInPost.displayName}
                  image={productImageData}
                />
              </div>
              <div className={productDetails}>
                <div className={itemName}>{productInPost.product.title}</div>
                <div className={variantName}>{productInPost.title}</div>
                <div className={price}>${12}</div>
              </div>
              <div className={addToCart}>
                <AddToCart
                  variantId={productInPost.id}
                  quantity={1}
                  available={productInPost.availableForSale}
                />
              </div>
            </div>
            <div className={postContent}>
              <p>"{post.caption}"</p>
            </div>
            <div className={postMeta}>
              <span className={postUser}>
                <a href={post.permalink}>@{post.username}</a>
              </span>
              <span>//</span>
              <span className={postTime}>
                {timeComponents[0][0] !== "0"
                  ? timeComponents[0]
                  : timeComponents[0][1]}
                .
                {timeComponents[1][0] !== "0"
                  ? timeComponents[1]
                  : timeComponents[1][1]}
                .{timeComponents[2].slice(2)}
              </span>
            </div>
            <div className={shareIcons}>
              <a href={post.permalink}>
                <FacebookIcon />
              </a>
              <a href={post.permalink}>
                <InstagramIcon />
              </a>
              <a href={post.permalink}>
                <PinterestIcon />
              </a>
              <a href={post.permalink}>
                <LinkIcon />
              </a>
            </div>
          </section>
        </div>
      ) : (
        <>
          <div className={modalShade}></div>
          <div className={mobileInstaModal} onClick={hideModal}>
            <div className={mImageSection}>
              <span className={mCloseButton} onClick={hideModal}>
                <CrossIcon />
              </span>
              <figure className={mPostImage}>
                <GatsbyImage image={postImageData} alt={post.caption} />
              </figure>
            </div>
            <div className={mProductSection}>
              <figure className={mProductImage}>
                <GatsbyImage
                  image={productImageData}
                  alt={product.displayName}
                />
              </figure>
              <figcaption className={mProductDetails}>
                <p className={mName}>{productInPost.product.title}</p>
                <span className={mPrice}>${12}</span>
              </figcaption>
            </div>
            <div className={mAddToCart}>
              <AddToCart
                variantId={productInPost.id}
                quantity={1}
                available={productInPost.availableForSale}
              />
            </div>
            <figcaption className={mPostCaption}>
              <p>{post.caption}</p>
            </figcaption>
            <div className={mPostMeta}>
              <span className={postUser}>
                <a href={post.permalink}>@{post.username}</a>
              </span>
              <span>//</span>
              <span className={postTime}>
                {timeComponents[0][0] !== "0"
                  ? timeComponents[0]
                  : timeComponents[0][1]}
                .
                {timeComponents[1][0] !== "0"
                  ? timeComponents[1]
                  : timeComponents[1][1]}
                .{timeComponents[2].slice(2)}
              </span>
            </div>
            <div className={mShareSection}>
              <a href={post.permalink}>
                <FacebookIcon />
              </a>
              <a href={post.permalink}>
                <InstagramIcon />
              </a>
              <a href={post.permalink}>
                <PinterestIcon />
              </a>
              <a href={post.permalink}>
                <LinkIcon />
              </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}

const ShopInsta = ({ data }) => {
  const {
    allInstagramContent: { edges: posts },
  } = data
  const {
    allShopifyProductVariant: { edges: variants },
  } = data
  const [showModal, setShowModal] = useState(false)
  const [curPost, setCurPost] = useState(posts[0].node)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const tabBP = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--tablet",
        10
      )
    )
    setIsMobile(window.innerWidth <= tabBP)
    console.log('isMobile: ', isMobile);
  }, [isMobile])

  useEffect(() => {
    if (showModal && !isMobile) {
      document.documentElement.style.overflow = "hidden"
    } else {
      document.documentElement.style.overflow = "scroll"
    }
  }, [showModal, isMobile])

  const getProductFromPost = ({ caption }) => {
    return variants.filter(({ node: v }) => caption.includes(v.displayName))
  }

  const setModalContentAndShow = (post) => {
    if (getProductFromPost(post).length === 0) {
      console.log("getProductFromPost(post) returned empty")
      return
    }
    setCurPost(post)
    setTimeout(() => {
      setShowModal(true)
    }, 200)
  }

  return (
    <div className={instaContainer}>
      {posts.map(({ node: thisPost }) => {
        const postImageData = getImage(
          thisPost.localImage.childImageSharp.gatsbyImageData
        )
        return (
          <div
            key={thisPost.id}
            className={instaPost}
            onClick={() => setModalContentAndShow(thisPost)}
          >
            <GatsbyImage alt={thisPost.id} image={postImageData} />
          </div>
        )
      })}
      {showModal && (
        <InstaModal
          post={curPost}
          getProductFromPost={getProductFromPost}
          hideModal={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

export default ShopInsta

export const query = graphql`
  query InstaQuery {
    allInstagramContent(limit: 15) {
      edges {
        node {
          id
          caption
          username
          timestamp(formatString: "MM-DD-YYYY")
          permalink
          localImage {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                width: 900
                quality: 80
                formats: [AVIF, WEBP]
                placeholder: DOMINANT_COLOR
              )
            }
          }
        }
      }
    }
    allShopifyProductVariant {
      edges {
        node {
          displayName
          id
          title
          price
          availableForSale
          product {
            title
            images {
              gatsbyImageData(layout: CONSTRAINED, width: 500)
            }
          }
        }
      }
    }
  }
`
