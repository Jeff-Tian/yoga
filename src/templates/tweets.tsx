import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'

const TweetTemplate = ({ data }) => (
  <Layout>
    <div
      style={{ marginTop: 20 }}
      dangerouslySetInnerHTML={{ __html: data.tweet.content }}
    />
  </Layout>
)
export default TweetTemplate

export const query = graphql`
  query($id: String!) {
    text(id: { eq: $id }) {
      content
    }
  }
`
