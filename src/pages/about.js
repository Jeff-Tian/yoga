import React from 'react'
import Layout from '../components/layout'

export default ({ location, data }) => (
  <Layout location={location} data={data}>
    <h1>About {data.site.siteMetadata.title}</h1>
    <p>
      I started practicing Yoga 2 years ago, and some magics had happen on me.
    </p>
  </Layout>
)

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
