import React from 'react'
import Link from 'gatsby-link'
import Layout from '../components/layout'

const SecondPage = ({ location, data }) => (
  <Layout location={location} data={data}>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
