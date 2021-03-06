const { resolve } = require('path');
const theme = require('./src/themes/theme');
const { excludeLegalPaths, sitemapExcludePaths } = require('./src/utils/utils');
require("dotenv").config()

const siteUrl = process.env.URL

const sitemapExcludes = sitemapExcludePaths()

module.exports = {
  trailingSlash: "always",
  siteMetadata: {
    title: "My Starter Blog", // TODO: Change default title
    description: "A simple blog built with Gatsby and MDX", // TODO: Change default description
    url: siteUrl,
    siteUrl: siteUrl,
    image: "",
    author: "Author", // TODO: Change default author
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-webpack-bundle-analyser-v2`,
    `gatsby-plugin-preact`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{userAgent: '*', allow: '/'}]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `articles`,
        path: `${__dirname}/src/articles`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      },
    },
    // TODO: Set cookies IDs
    {
        resolve: `gatsby-plugin-gdpr-cookies`,
        options: {
            googleAnalytics: {
                trackingId: '', // leave empty if you want to disable the tracker
                cookieName: 'gatsby-gdpr-google-analytics', // default
                anonymize: true, // default
                allowAdFeatures: false // default
            },
            googleTagManager: {
                trackingId: '', // leave empty if you want to disable the tracker
                cookieName: 'gatsby-gdpr-google-tagmanager', // default
                dataLayerName: 'dataLayer', // default
            },
            facebookPixel: {
                pixelId: '', // leave empty if you want to disable the tracker
                cookieName: 'gatsby-gdpr-facebook-pixel', // default
            },
            tikTokPixel: {
                pixelId: '', // leave empty if you want to disable the tracker
                cookieName: 'gatsby-gdpr-tiktok-pixel', // default
            },
            environments: ['production', 'development'],
        },
    },
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        useAutoGen: true,
        autoGenHomeLabel: `Home`,
        exclude: [
          `**/dev-404-page/**`,
          `**/404/**`,
          `**/404.html`,
          `**/offline-plugin-app-shell-fallback/**`
        ],
        excludeOptions: {
          separator: '.'
        },
        trailingSlashes: true,
      },
    },
    {
      resolve: "gatsby-plugin-page-progress",
      options: {
        includePaths: [{ regex: "^\/.+\/.+\/.+" }], // TODO: Include manual paths
        excludePaths: [{ regex: "^\/.*-.*\/.*\/\\d+\/?$"}],
        height: 5,
        prependToBody: false,
        color: `${theme.colors.main1}`,
        footerHeight: 500,
        headerHeight: 0,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images/
        }
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`, 
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
              maintainCase: false,
              removeAccents: true,
              isIconAfterHeader: false,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    // `gatsby-plugin-emotion`,
    `gatsby-plugin-smoothscroll`,
    {
        resolve: `gatsby-transformer-remark`,
        options: {
            plugins: [
                `gatsby-remark-autolink-headers`,
            ],
        },
    },
    `gatsby-plugin-preload-fonts`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: sitemapExcludes,
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
                pageContext
              }
            }
          }
        `,
        serialize: (page, { resolvePagePath }) => {
          return {
            url: `${resolvePagePath(page)}`,
            changefreq: `daily`,
            priority: 0.7,
            lastmod: page.pageContext.modifiedDate,
          }
        },
      }
    }
  ]
}
