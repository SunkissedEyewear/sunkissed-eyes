import React from "react"
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import { graphql } from "gatsby"
import {
  collage,
  collageRow,
  photo
} from "./index.module.scss"

export const query = graphql`
  query {
    photos: allFile(
      filter: { relativeDirectory: { eq: "landing-page" } }
      sort: { fields: base, order: ASC }
    ) {
      edges {
        node {
          id
          base
          childImageSharp {
            gatsbyImageData(
              width: 1000
              quality: 90
              placeholder: TRACED_SVG
              tracedSVGOptions: {
                color: "#f8cbd2"
              }
              formats: [WEBP, AVIF, AUTO]
            )
          }
        }
      }
    }
  }
`

export default function IndexPage({ data }) {
  const images = data.photos.edges.map(p => (
    getImage(p.node)
  ))

  return (
    <section className={collage} >
      <div className={collageRow}>
        <div className={photo} >
          <GatsbyImage loading="eager" image={images[0]}/>
        </div>
        <div className={photo} >
          <GatsbyImage loading="eager" image={images[1]}/>
        </div>
      </div>
      <div className={collageRow}>
        <div className={photo} >
          <GatsbyImage loading="eager" image={images[2]}/>
        </div>
        <div className={photo} >
          <GatsbyImage loading="eager" image={images[3]}/>
        </div>
      </div>
      <div className={collageRow}>
        <div className={photo} >
          <GatsbyImage loading="eager" image={images[4]}/>
        </div>
        <div className={photo} >
          <GatsbyImage loading="eager" image={images[5]}/>
        </div>
      </div>
    </section>
  )
}


{/*
  <div className={container}>
    <h1 className={intro}>Welcome to the GatsbyJS + Shopify Demo Store.</h1>
    <p className={callOut}>
      It's a proof-of-concept in a box, with 10k products and 30k variants
      to help you get to proof-of-concept as soon as right now.
    </p>
    <p className={callToAction}>
      Hook it up to your own Shopify store data and start customizing in
      minutes by deploying it to Gatsby Cloud for free. Grab your Shopify
      store credentials and
      <a href="https://www.gatsbyjs.com/dashboard/deploynow?url=https://github.com/gatsbyjs/gatsby-starter-shopify&utm_campaign=shopify-starter">
        <img
          src="https://www.gatsbyjs.com/deploynow.png"
          alt="Deploy to Gatsby Cloud"
          className={deployButton}
        />
      </a>
    </p>
  </div>
  <ProductListing products={data.shopifyCollection.products} /> 
*/}