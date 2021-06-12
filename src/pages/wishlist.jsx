import React, { useEffect, useState } from "react"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import { useMutation, useQuery, gql } from "@apollo/client"
import debounce from "lodash.debounce"

import WishlistItems from "../components/wishlist-items"

import { wishlistContainer, noItems } from "./wishlist.module.scss"

const CUSTOMER_QUERY = gql`
  query MyQuery($_email: String = "") {
    Customers(where: { email: { _eq: $_email } }) {
      wishlist
      fl_name
    }
  }
`
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

const Wishlist = () => {
  const [curUserWishlist, setCurUserWishlist] = useState([])
  console.log("curUserWishlist: ", curUserWishlist)
  const { user, isAuthenticated } = useAuth0()
  const email = user.email

  const {
    loading: customerLoading,
    error,
    data: customerData,
    refetch,
  } = useQuery(CUSTOMER_QUERY, {
    variables: { _email: email },
  })

  const [updateDbWishlist] = useMutation(
    UPDATE_WISHLIST
  )

  useEffect(() => {
    if (customerData !== undefined) {
      setCurUserWishlist(customerData?.Customers[0]?.wishlist)
    }
  }, [customerData])

  if (customerLoading) {
    return <span>Loading...</span>
  }
  if (error) {
    return <span>Error loging in! Please try again.</span>
  }

  const refetchAndUpdateWishlist = debounce((id) => {
    refetch()
    if (customerLoading) {
      return
    }
    const dbWishlist =
      customerData !== undefined ? customerData.Customers[0].wishlist : null

    if (isAuthenticated && dbWishlist.includes(id)) {
      console.log("id from wlpage remove fn: ", id)
      const itemRemovedWishlist = dbWishlist.filter((wli) => wli !== id)
      const postGresFormattedWishlist = `{${itemRemovedWishlist.map(
        (wli) => wli
      )}}`
      console.log("postGresFormattedWishlist: ", postGresFormattedWishlist)

      updateDbWishlist({
        variables: {
          email: user.email,
          wishlist: postGresFormattedWishlist,
        },
      })
        .then(() => refetch())
        .catch((err) => console.log("error from callback: ", err))
    }
  })

  const curUser = customerData?.Customers[0] ?? { fl_name: "", wishlist: null }

  return (
    <div className={wishlistContainer} >
      {isAuthenticated ? (
        <>
          {curUserWishlist && curUserWishlist.length > 0 ? (
            <WishlistItems
              updateWishlist={refetchAndUpdateWishlist}
              wishlist={curUser.wishlist}
              userName={curUser.fl_name}
            />
          ) : (
            <p className={noItems}>No items in your wishlist!</p>
          )}
        </>
      ) : (
        <span>
          Error logging in! Please reload the page and try logging in again.
        </span>
      )}
    </div>
  )
}

export default withAuthenticationRequired(Wishlist)
