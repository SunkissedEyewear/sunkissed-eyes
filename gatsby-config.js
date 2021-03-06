require("dotenv").config()
  
module.exports = {
  siteMetadata: {
    siteTitle: "gatsby-starter-shopify",
    siteTitleDefault: "gatsby-starter-shopify by @GatsbyJS",
    siteUrl: "https://shopify30k.gatsbyjs.io",
    hrefLang: "en",
    siteDescription:
      "A Gatsby starter using the latest Shopify plugin showcasing a store with product overview, individual product pages, and a cart.",
    siteImage: "/default-og-image.jpg",
    twitter: "@gatsbyjs",
  },
  flags: {
    FAST_DEV: true,
    PARALLEL_SOURCING: true,
  },
  plugins: [
    {
      resolve: "gatsby-source-shopify",
      options: {
        apiKey: process.env.GATSBY_SHOPIFY_API_KEY,
        password: process.env.GATSBY_SHOPIFY_SHOP_PASSWORD,
        storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
        shopifyConnections: ["collections"],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-instagram-all`,
      options: {
        access_token:
          "IGQVJWdEhyOVk4SmpJUXhuWVpIS1R4UWM2aFpSdlRoUjAtVHVGVnFYdXJUM0ZAlaTNLZAzl2UkhZAd1RtOWZADYVgzai1ycklpUk9LZAml4S0VTckgxaWIzUk05aGVNSjYzZAWRSU2NucTc2ZAzdNSWRQQmdUXwZDZD",
      },
    },
    'gatsby-plugin-ngrok-tunneling',
    "gatsby-plugin-image",
    "gatsby-plugin-offline",
    "gatsby-plugin-sharp",
    "gatsby-plugin-layout",
    "gatsby-plugin-sass",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-gatsby-cloud",
  ],
}
