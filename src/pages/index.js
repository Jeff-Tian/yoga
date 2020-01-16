import React from 'react'
import g from 'glamorous'

import { rhythm } from '../utils/typography'
import Link from 'gatsby-link'
import Layout from '../components/layout'

export default ({ location, data }) => {
  return (
    <Layout location={location} data={data}>
      <g.H1 display={'inline-block'} borderBottom={'1px solid'}>
        Keep practice
      </g.H1>

      <h4>{data.allWordpressPost.totalCount} Posts</h4>
      {data.allWordpressPost.edges.map(({ node }) => (
        <div key={node.id}>
          <Link
            to={`/post/` + node.slug}
            css={{ textDecoration: `none`, color: `inherit` }}
          >
            <g.H3 marginBottom={rhythm(1 / 4)}>
              {node.title} <g.Span color="#BBB">— {node.date}</g.Span>
            </g.H3>
            <p>{node.excerpt}</p>
          </Link>
        </div>
      ))}

      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <Link
            to={node.fields.slug}
            css={{ textDecoration: `none`, color: `inherit` }}
          >
            <g.H3 marginBottom={rhythm(1 / 4)}>
              {node.frontmatter.title}{' '}
              <g.Span color="#BBB">— {node.frontmatter.date}</g.Span>
            </g.H3>
            <p>{node.excerpt}</p>
          </Link>
        </div>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
    allWordpressPost {
      totalCount
      edges {
        node {
          id
          slug
          title
          excerpt
        }
      }
    }
  }
`
