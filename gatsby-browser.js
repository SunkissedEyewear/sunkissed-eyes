import * as React from "react"
import { StoreProvider } from "./src/context/store-context"
import { Auth0Provider } from "@auth0/auth0-react"
import { navigate } from "gatsby"

// styles
import "./src/styles/reset.css"
import "./src/styles/variables.css"
import "./src/styles/global.css"

const onRedirectCallback = (appState) => {
  // Use Gatsby's navigate method to replace the url
  navigate(appState?.returnTo || "/", { replace: true })
}

export const wrapRootElement = ({ element }) => {
  const domain = process.env.AUTH0_DOMAIN
  const clientId = process.env.AUTH0_CLIENTID
  const callback = process.env.AUTH0_CALLBACK
  
  return (
    <StoreProvider>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={callback}
        onRedirectCallback={onRedirectCallback}
      >
        {element}
      </Auth0Provider>
    </StoreProvider>
  )
}
