import * as React from "react"
import { Link } from "gatsby"
import { gql, useMutation, useQuery } from "@apollo/client"
import { useAuth0 } from "@auth0/auth0-react"

// store context
import { StoreContext } from "../context/store-context"

// components
import { CartButton } from "./cart-button"
import SearchIcon from "../icons/search"
import WishlistIcon from "../icons/wishlist"
import SocialLinks from "./social-links"
import { Toast } from "./toast"

// styles
import {
  navRight,
  navRightButton,
  internal,
  account,
  rotateWrapper,
} from "./nav-right.module.scss"

// const client = new ApolloClient({
//   uri: "https://sunkissed-heroku-db.herokuapp.com/v1/graphql",
//   cache: new InMemoryCache(),
// })

const ADD_CUSTOMER = gql`
  mutation MyMutation($email: String = "", $fl_name: String = "") {
    insert_Customers_one(object: { email: $email, fl_name: $fl_name }) {
      fl_name
    }
  }
`

const CUSTOMER_QUERY = gql`
  query MyQuery($_email: String = "") {
    Customers(where: { email: { _eq: $_email } }) {
      wishlist
      fl_name
    }
  }
`

export function NavRight() {
  const { checkout, loading, didJustAddToCart } = React.useContext(StoreContext)

  const items = checkout ? checkout.lineItems : []

  const quantity = items.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  const {
    user,
    isAuthenticated,
    logout,
    loginWithPopup,
    isLoading,
  } = useAuth0()

  // get function to add customer
  const [addCustomer] = useMutation(ADD_CUSTOMER)
  //

  // get customer data to check against existing user
  const { loading: customerLoading, data: customerData, refetch } = useQuery(
    CUSTOMER_QUERY,
    {
      variables: { _email: user?.email },
    }
  )

  const createCustomer = (userEmail, userName) => {
    addCustomer({ variables: { email: userEmail, fl_name: userName } })
  }

  React.useEffect(() => {
    if (isAuthenticated && user.email && !customerLoading) {
      refetch({ variables: { _email: user.email } })
      const isNewCustomer = customerData.Customers.length === 0
      if (isNewCustomer && !isLoading) {
        createCustomer(user.email, user.name)
      } else {
      }
    }
  }, [
    refetch,
    user,
    isAuthenticated,
    isLoading,
    customerData,
    customerLoading,
  ])

  return (
    <div className={navRight}>
      <div className={internal}>
        <Link to="/search" className={navRightButton}>
          <SearchIcon />
        </Link>
        <CartButton quantity={quantity} />
        <Toast show={loading || didJustAddToCart}>
          {!didJustAddToCart ? (
            "Updating…"
          ) : (
            <>
              Added to cart{" "}
              <svg
                width="14"
                height="14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.019 10.492l-2.322-3.17A.796.796 0 013.91 6.304L6.628 9.14a1.056 1.056 0 11-1.61 1.351z"
                  fill="#fff"
                />
                <path
                  d="M5.209 10.693a1.11 1.11 0 01-.105-1.6l5.394-5.88a.757.757 0 011.159.973l-4.855 6.332a1.11 1.11 0 01-1.593.175z"
                  fill="#fff"
                />
                <path
                  d="M5.331 7.806c.272.326.471.543.815.163.345-.38-.108.96-.108.96l-1.123-.363.416-.76z"
                  fill="#fff"
                />
              </svg>
            </>
          )}
        </Toast>
        <Link to="/wishlist" className={navRightButton}>
          <WishlistIcon />
        </Link>
        <div className={account}>
          <div className={rotateWrapper}>
            {isLoading ? (
              " "
            ) : isAuthenticated ? (
              <span
                className={navRightButton}
                onClick={() => logout({ returnTo: "http://localhost:8000" })}
              >
                logout
              </span>
            ) : (
              <span className={navRightButton} onClick={() => loginWithPopup()}>
                login
              </span>
            )}
          </div>
        </div>
      </div>
      <SocialLinks />
    </div>
  )
}
