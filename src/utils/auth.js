// import auth0 from "auth0-js"

// export const isBrowser = typeof window !== "undefined"

// const tokens = {
//   idToken: false,
//   accessToken: false,
// }

// let user = {}

// export const isAuthenticated = () => {
//   return tokens.idToken !== false
// }

// const auth = isBrowser
//   ? new auth0.WebAuth({
//       domain: process.env.AUTH0_DOMAIN,
//       clientID: process.env.AUTH0_CLIENTID,
//       redirectUri: process.env.AUTH0_CALLBACK,
//       responseType: "token id_token",
//       scope: "openid profile email",
//     })
//   : {}

// export const login = () => {
//   if (!isBrowser) {
//     return
//   }

//   auth.authorize()
// }

// export const logout = () => {
//   tokens.accessToken = false
//   tokens.idToken = false
//   user = {}
//   window.localStorage.setItem("isLoggedIn", false)

//   auth.logout({
//     returnTo: window.location.origin,
//   })
// }

// const setSession = (cb = () => {}) => (err, authResult) => {
//   if (err) {
//     if (err.error === "login_required") {
//       login()
//     }
//   }
//   if (authResult && authResult.accessToken && authResult.idToken) {
//     tokens.idToken = authResult.idToken
//     tokens.accessToken = authResult.accessToken

//     auth.client.userInfo(tokens.accessToken, (_err, userProfile) => {
//       user = userProfile
//       window.localStorage.setItem("isLoggedIn", true)

//       cb()
//     })
//   }
// }

// export const checkSession = (callback) => {
//   const isLoggedIn = window.localStorage.getItem("isLoggedIn")
//   if (isLoggedIn === "false" || isLoggedIn === null) {
//     callback()
//   }
//   const protectedRoutes = [`/account`, `/callback`]
//   const isProtectedRoute = protectedRoutes
//     .map((route) => window.location.pathname.includes(route))
//     .some((route) => route)
//   if (isProtectedRoute) {
//     auth.checkSession({}, setSession(callback))
//   }
// }

// export const handleAuthentication = () => {
//   auth.parseHash(setSession())
// }

// export const getProfile = () => {
//   return user
// }

// // ! ----Alternate version of Auth.js---- !--------------------------------------------------------------------- //

// // import auth0 from "auth0-js"

// // export const isBrowser = typeof window !== "undefined"

// // // To speed things up, we’ll keep the profile stored unless the user logs out.
// // // This prevents a flicker while the HTTP round-trip completes.
// // let profile = false

// // const tokens = {
// //   accessToken: false,
// //   idToken: false,
// //   expiresAt: false,
// // }

// // // Only instantiate Auth0 if we’re in the browser.
// // const auth = isBrowser
// //   ? new auth0.WebAuth({
// //       domain: process.env.AUTH0_DOMAIN,
// //       clientID: process.env.AUTH0_CLIENTID,
// //       redirectUri: process.env.AUTH0_CALLBACK,
// //       // audience: process.env.AUTH0_AUDIENCE,
// //       responseType: "token id_token",
// //       scope: "openid profile email",
// //     })
// //   : {}

// // export const login = () => {
// //   if (!isBrowser) {
// //     return
// //   }

// //   auth.authorize()
// // }

// // export const logout = () => {
// //   localStorage.setItem("isLoggedIn", false)
// //   profile = false

// //   const { protocol, host } = window.location
// //   const returnTo = `${protocol}//${host}`

// //   auth0.logout({ returnTo })
// // }

// // const setSession = (callback) => (err, authResult) => {
// //   if (!isBrowser) {
// //     return
// //   }

// //   if (err) {
// //     console.error(err)
// //     callback()
// //     return
// //   }

// //   if (authResult && authResult.accessToken && authResult.idToken) {
// //     let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
// //     tokens.accessToken = authResult.accessToken
// //     tokens.idToken = authResult.idToken
// //     tokens.expiresAt = expiresAt
// //     profile = authResult.idTokenPayload
// //     localStorage.setItem("isLoggedIn", true)
// //     callback()
// //   }
// // }

// // export const silentAuth = (callback) => {
// //   if (!isBrowser) {
// //     return
// //   }

// //   if (!isAuthenticated()) return callback()
// //   auth0.checkSession({}, setSession(callback))
// // }

// // export const handleAuthentication = (callback = () => {}) => {
// //   if (!isBrowser) {
// //     return
// //   }

// //   auth0.parseHash(setSession(callback))
// // }

// // export const isAuthenticated = () => {
// //   if (!isBrowser) {
// //     return
// //   }

// //   return localStorage.getItem("isLoggedIn") === "true"
// // }

// // export const getAccessToken = () => {
// //   if (!isBrowser) {
// //     return ""
// //   }

// //   return tokens.accessToken
// // }

// // export const getUserInfo = () => {
// //   if (profile) {
// //     return profile
// //   }
// // }
