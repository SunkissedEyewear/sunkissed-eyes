import * as React from "react"
import { StoreProvider } from "./src/context/store-context"
import { Auth0Provider } from "@auth0/auth0-react"
import { navigate } from "gatsby"
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"
import fetch from 'isomorphic-fetch';

// styles
import "./src/styles/reset.css"
import "./src/styles/variables.css"
import "./src/styles/global.css"


const httpLink = new HttpLink({
  uri: "https://sunkissed-heroku-db.herokuapp.com/v1/graphql",
  fetch,
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

const onRedirectCallback = (appState) => {
  // Use Gatsby's navigate method to replace the url
  navigate(appState?.returnTo || "/", { replace: true })
}

export const wrapRootElement = ({ element }) => {
  const domain = process.env.GATSBY_AUTH0_DOMAIN
  const clientId = process.env.GATSBY_AUTH0_CLIENTID
  const callback = process.env.GATSBY_AUTH0_CALLBACK
  
  return (
    <StoreProvider>
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          redirectUri={callback}
          onRedirectCallback={onRedirectCallback}
        >
          <ApolloProvider client={client}>
            {element}
          </ApolloProvider>
        </Auth0Provider>
      </StoreProvider>
  )
}
