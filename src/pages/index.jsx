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
      filter: { relativeDirectory: { eq: "home-page" } }
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
      <div className={collageRow}>
        <div className={photo} >
          <GatsbyImage loading="eager" image={images[6]}/>
        </div>
        <div className={photo} >
          <GatsbyImage loading="eager" image={images[7]}/>
        </div>
      </div>
      <div className={collageRow}>
        <div className={photo} >
          <GatsbyImage loading="eager" image={images[8]}/>
        </div>
        <div className={photo} >
          <GatsbyImage loading="eager" image={images[9]}/>
        </div>
      </div>
    </section>
  )
}