import React from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import { graphql } from "gatsby"
import { ApolloClient, InMemoryCache } from "@apollo/client"
import { useQuery, gql } from "@apollo/client"

import WishlistItems from '../components/wishlist-items'



const CUSTOMER_QUERY = gql`
  query MyQuery($_email: String = "") {
    Customers(where: {email: {_eq: $_email}}) {
      wishlist
      fl_name
    }
  }
`
const Wishlist = () => {
  const { user, isAuthenticated } = useAuth0()
  const email = user.email
  

  const { loading, error, data } = useQuery(CUSTOMER_QUERY, {
    variables: { _email: email }
  })

  if (loading) {
    return <span>Loading...</span>
  }
  if (error) {
    return <span>Error loging in! Please try again.</span>
  }

  const curUser = data?.Customers[0] ?? { fl_name: '', wishlist: null }
  console.log('curUser: ', curUser);
  console.log('curUser wishlist: ', curUser.wishlist);

  return (
    <div>
      {isAuthenticated ? (
        <>
          <h2>Welcome, {curUser.fl_name}!</h2>
          {curUser.wishlist ? (
            <WishlistItems wishlist={curUser.wishlist}/>
          ) : (
            <p>No items in your wishlist!</p>
          )}
        </>
      ) : (
        <span>Error logging in! Please reload the page and try logging in again.</span>
      )}
    </div>
  )
}

export default withAuthenticationRequired(Wishlist)
