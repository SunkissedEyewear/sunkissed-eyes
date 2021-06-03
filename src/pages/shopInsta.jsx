import React from 'react'
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import {
  instaContainer,
  instaPost,
} from './shopInsta.module.scss'


const shopInsta = ({ data }) => {
  const { allInstagramContent: { edges: posts } } = data
  console.log("posts from shop insta: ", posts)

  
  return (
    <div className={instaContainer}>
      {posts.map(({ node: post }) => {
        const postImageData = getImage(post.localImage.childImageSharp.gatsbyImageData)
        
        return (
          <div className={instaPost}>
            <GatsbyImage image={postImageData} />
          </div>
        )
      })}
    </div>
  )
}

export default shopInsta

export const query = graphql`
  query InstaQuery {
    allInstagramContent(limit: 15) {
      edges {
        node {
          caption
          username
          media_url
          localImage {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                width: 500
                quality: 80
                formats: [AVIF, WEBP]
                placeholder: TRACED_SVG
                tracedSVGOptions: { color: "#f8cbd2" }
              )
            }
          }
        }
      }
    }
  }
`