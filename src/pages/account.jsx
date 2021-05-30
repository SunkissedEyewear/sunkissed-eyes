import React from "react"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"

import WishlistItems, { wishlistItems } from '../components/wishlist-items'

import {
  accountContainer,
  welcomeHeader,
  orderHistory,
  wishlistContainer,
} from "./account.module.scss"

const Account = () => {
  const { user, logout, isAuthenticated } = useAuth0()
  console.log("isAuthenticated: ", isAuthenticated)
  console.log("user: ", user)

  return (
    <div className={accountContainer}>
      {user.nickname === "jamesmawalker" ? (
        <>
          <div className={welcomeHeader}>
            <h4>Welcome, {user.name}</h4>
          </div>
          <div className={orderHistory}>
            You have not made any purchases yet.
          </div>
          <div className={wishlistContainer}>
            Current Wishlist:
            <WishlistItems />
          </div>
        </>
      ) : (
        <p>You have not made any purchases yet.</p>
      )}
      <a
        href="#logout"
        onClick={(e) => {
          logout({ returnTo: "http://localhost:8000" })
          e.preventDefault()
        }}
      >
        Log Out
      </a>
    </div>
  )
}

export default withAuthenticationRequired(Account)
