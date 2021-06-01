import React, { useCallback, useContext, useEffect, useRef, useState } from "react"
import { graphql, Link } from "gatsby"
import isEqual from "lodash.isequal"
import debounce from "lodash.debounce"
import { GatsbyImage, getSrc } from "gatsby-plugin-image"
import { StoreContext } from "../../../context/store-context"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery, gql } from "@apollo/client"

import { AddToCart } from "../../../components/add-to-cart"
import { NumericInput } from "../../../components/numeric-input"
import { formatPrice } from "../../../utils/format-price"
import { Seo } from "../../../components/seo"
import HeartIcon from "../../../icons/heart"
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
  subHeader,
  heart,
  filled,
  empty,
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
import wishlist from "../../wishlist"

const CUSTOMER_QUERY = gql`
  query MyQuery($_email: String = "") {
    Customers(where: { email: { _eq: $_email } }) {
      wishlist
    }
  }
`

// $wishlist must be in form: "{item1, item2}"
const UPDATE_WISHLIST = gql`
  mutation MyMutation($email: String = "", $wishlist: _text = "") {
    update_Customers(
      where: { email: { _eq: $email } }
      _set: { wishlist: $wishlist }
    ) {
      returning {
        wishlist
      }
    }
  }
`

export default function Product({ data: { product, suggestions } }) {
  const pImageWrapRef = useRef(null)

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
  const { client } = useContext(StoreContext)
  const { user, isAuthenticated, isLoading } = useAuth0()

  const {
    loading: customerLoading,
    error,
    data: customerData,
    refetch,
  } = useQuery(CUSTOMER_QUERY, {
    variables: { _email: user?.email },
  })

  const [updateDbWishlist, { data: mutationData }] = useMutation(UPDATE_WISHLIST)

  const [itemInWishlist, setItemInWishlist] = useState(false)

  const [variant, setVariant] = useState({ ...initialVariant })
  const [quantity, setQuantity] = useState(1)

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant

  const [available, setAvailable] = useState(productVariant.availableForSale)


  // > ------------ Availability and Price Handling ------------ < //
  const checkAvailablity = useCallback(
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

  useEffect(() => {
    checkAvailablity(product.storefrontId)
  }, [productVariant.storefrontId, checkAvailablity, product.storefrontId])

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    variant.price
  )

  const hasVariants = variants.length > 1
  const hasImages = images.length > 0
  const hasMultipleImages = images.length > 1


  // > ------------ Color Option Changes ------------< //
  const handleOptionChange = (index, value) => {
    if (value === "" || value === null || isLoading) {
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
    setVariant({ ...selectedVariant })
  }


  // > ------------ Wishlist Handling ------------ < //
  // set itemInWishlist whenever variant or customer changes
  useEffect(() => {
    if (customerData !== undefined) {
      checkProductInWishlist()
    }
  }, [variant, customerData])

  // wishlist+product comparison fn
  const checkProductInWishlist = debounce(() => {
    if (isAuthenticated && customerData !== undefined && !isLoading) {
      const wishlist = customerData.Customers[0].wishlist
      setItemInWishlist(wishlist.includes(variant.id))
    }

    // setItemInWishlist(wishlist.includes(variant.id))
    return itemInWishlist
  }, 500)

  // Once product and user info loaded, call compare fn
  useEffect(() => {
    if (isAuthenticated && !customerLoading) {
      refetch({
        variables: { _email: user.email },
      })
      checkProductInWishlist()
    }
  }, [isAuthenticated, customerLoading, customerData])

  //  -- when heart clicked:
  const fakeWishlist = [
    "745e7f79-618e-579c-bcf8-540ceb04a866",
    "669b81d7-989d-5f87-9179-310e011d5697",
  ]

  const fakeFilteredList = `"{${fakeWishlist.map(i => i)}}"`
  const addRemoveFromWishlist = () => {
    //   + if in list, useMutation to remove from list
    const dbWishlist =
      customerData !== undefined ? customerData.Customers[0].wishlist : null

    if (dbWishlist.includes(variant.id) && isAuthenticated) {
      console.log('variant.id from item page remove fn: ', variant.id);
      if (customerLoading) {
        return
      }
      const itemRemovedWishlist = dbWishlist.filter((wli) => wli !== variant.id)
      const testVar = `{${itemRemovedWishlist.map((wli) => `${wli} ` )}}`
      console.log("array as written when WLI removed from item page: ", testVar)
      updateDbWishlist({
        variables: {
          email: user.email,
          wishlist: `{${itemRemovedWishlist.map((wli) => wli)}}`,
        },
      })
      refetch()
      setItemInWishlist(false)
    } else {
      refetch()
      if (customerLoading) {
        return
      }
      const itemAddedWishlist = [...dbWishlist, variant.id]
      updateDbWishlist({
        variables: {
          email: user.email,
          wishlist: `{${itemAddedWishlist.map((wli) => wli)}}`,
        },
      })
      setItemInWishlist(true)
    }
  }

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
                <h2 className={subHeader}>
                  <span>{price}</span>
                  <span onClick={addRemoveFromWishlist}>
                    <HeartIcon
                      classN={`${heart} ${itemInWishlist ? filled : empty}`}
                    />
                  </span>
                </h2>
              </div>
              <div className={colorsContainer}>
                <h4>colors</h4>
                <fieldset className={optionsWrapper}>
                  {hasVariants &&
                    options[0].values.map((value, index) => {
                      // value is variant title
                      const colors = [
                        "#272727",
                        "#4f88bb",
                        "#B69900",
                        "#C4C4C4",
                        "#cc7b8a5",
                      ]

                      const activeSelection =
                        value === variant.title ? activeColorOption : ""

                      return (
                        <div className={selectVariant}>
                          <div
                            class={colorOption}
                            id={value}
                            style={{
                              background: colors[index],
                              border: `2px solid ${colors[index]}`,
                            }}
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
        id
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
