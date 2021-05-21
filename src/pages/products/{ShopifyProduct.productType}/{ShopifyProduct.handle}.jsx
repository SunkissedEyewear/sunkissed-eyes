import * as React from "react"
import { graphql, Link } from "gatsby"
import isEqual from "lodash.isequal"
import { GatsbyImage, getSrc } from "gatsby-plugin-image"
import { StoreContext } from "../../../context/store-context"

import { AddToCart } from "../../../components/add-to-cart"
import { NumericInput } from "../../../components/numeric-input"
import { formatPrice } from "../../../utils/format-price"
import { Seo } from "../../../components/seo"
import { CgChevronRight as ChevronIcon } from "react-icons/cg"
import {
  productBox,
  container,
  header,
  imageScrollWrapper,
  productImageWrapper,
  productImageList,
  scrollForMore,
  noImagePreview,
  optionsWrapper,
  colorOption,
  currOption,
  activeColorOption,
  priceValue,
  selectVariant,
  labelFont,
  breadcrumb,
  tagList,
  addToCartStyle,
  metaSection,
  productDetails,
  productDescription,
  headerContainer,
  colorsContainer,
} from "./product-page.module.scss"

export default function Product({ data: { product, suggestions } }) {
  const pImageWrapRef = React.useRef(null)
  
  const {
    options,
    variants,
    variants: [initialVariant],
    priceRangeV2,
    title,
    description,
    images,
    images: [firstImage],
  } = product
  const { client } = React.useContext(StoreContext)

  

  const [variant, setVariant] = React.useState({ ...initialVariant })
  const [quantity, setQuantity] = React.useState(1)

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant

  const [available, setAvailable] = React.useState(
    productVariant.availableForSale
  )

  const checkAvailablity = React.useCallback(
    (productId) => {
      client.product.fetch(productId).then((fetchedProduct) => {
        const result =
          fetchedProduct?.variants.filter(
            (variant) => variant.id === productVariant.storefrontId
          ) ?? []

        if (result.length > 0) {
          setAvailable(result[0].available)
        }
      })
    },
    [productVariant.storefrontId, client.product]
  )

  const handleOptionChange = (index, value) => {
  // const handleOptionChange = (index, event) => {
    // const value = event.target.value
    
    

    if (value === "") {
      return
    }

    const currentOptions = [...variant.selectedOptions]

    currentOptions[index] = {
      ...currentOptions[index],
      value,
    }

    const selectedVariant = variants.find((variant) => {
      return isEqual(currentOptions, variant.selectedOptions)
    })
    
    console.log("selectedVariant: ", selectedVariant)
    setVariant({ ...selectedVariant })
  }

  React.useEffect(() => {
    checkAvailablity(product.storefrontId)
  }, [productVariant.storefrontId, checkAvailablity, product.storefrontId])

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    variant.price
  )

  const hasVariants = variants.length > 1
  const hasImages = images.length > 0
  const hasMultipleImages = images.length > 1

  return (
    <>
      <Seo
        title={title}
        description={description}
        image={getSrc(firstImage.gatsbyImageData)}
      />
      <main data-scroll-container>
        <div className={container}>
          <div className={productBox}>
            {hasImages && (
              <div
                className={productImageWrapper}
                ref={pImageWrapRef}
                data-scroll-section
              >
                <div
                  className={imageScrollWrapper}
                  role="group"
                  aria-label="gallery"
                  aria-describedby="instructions"
                >
                  {hasImages ? (
                    <ul className={productImageList}>
                      {images.map((image, index) => (
                        <li key={`product-image-${index}`}>
                          <GatsbyImage
                            objectFit="contain"
                            alt={
                              image.altText
                                ? image.altText
                                : `Product Image of ${title} #${index + 1}`
                            }
                            image={image.gatsbyImageData}
                          />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className={noImagePreview}>No Preview image</span>
                  )}
                </div>
              </div>
            )}

            <div className={productDetails}>
              {/* <div className={breadcrumb}>
                <Link to={product.productTypeSlug}>{product.productType}</Link>
                <ChevronIcon size={12} />
              </div> */}
              <div className={headerContainer}>
                <h1 className={header}>{title}</h1>
                <h2 className={priceValue}>
                  <span>{price}</span>
                </h2>
              </div>
              <div className={colorsContainer}>
                <h4>colors</h4>
                <fieldset className={optionsWrapper}>
                  {hasVariants &&
                    options[0].values.map((value, index) => {
                      const colors = [
                        "#272727",
                        "#4f88bb",
                        "#B69900",
                        "#C4C4C4",
                        "#cc7b8a5",
                      ]

                      const activeSelection = value === variant.title ? activeColorOption : ''
                      console.log('activeSelection: ', activeSelection);

                      return (
                        <div className={selectVariant}>
                          <div
                            class={colorOption}
                            id={value}
                            style={{
                              background: colors[index],
                              border: `2px solid ${colors[index]}`,
                            }}
                            // type="radio"
                            name="options"
                            value={value}
                            onClick={(event) => {
                              const val = event.target.getAttribute("value")

                              handleOptionChange(0, val)
                            }}
                          >
                            <span className={activeSelection}></span>
                          </div>
                        </div>
                      )
                    })}
                </fieldset>
                <p className={currOption}>{variant.title}</p>
              </div>
              <div className={metaSection}>
                <span>+ stainless steel frame</span>
                <span>+ antiglare lens</span>
                <span></span>
                {product.description}
                {/* <span className={labelFont}>Type</span>
                <span className={tagList}>
                  <Link to={product.productTypeSlug}>
                    {product.productType}
                  </Link>
                </span>

                <span className={labelFont}>Tags</span>
                <span className={tagList}>
                  {product.tags.map((tag) => (
                    <Link to={`/search?t=${tag}`}>{tag}</Link>
                  ))}
                </span> */}
              </div>
              <div className={addToCartStyle}>
                <AddToCart
                  variantId={productVariant.storefrontId}
                  quantity={quantity}
                  available={available}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export const query = graphql`
  query($id: String!, $productType: String!) {
    product: shopifyProduct(id: { eq: $id }) {
      title
      description
      productType
      productTypeSlug: gatsbyPath(
        filePath: "/products/{ShopifyProduct.productType}"
      )
      tags
      priceRangeV2 {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      storefrontId
      images {
        # altText
        gatsbyImageData(layout: CONSTRAINED, width: 640, aspectRatio: 1)
      }
      variants {
        availableForSale
        storefrontId
        title
        price
        selectedOptions {
          name
          value
        }
      }
      options {
        name
        values
        id
      }
    }
    suggestions: allShopifyProduct(
      limit: 3
      filter: { productType: { eq: $productType }, id: { ne: $id } }
    ) {
      nodes {
        ...ProductCard
      }
    }
  }
`
