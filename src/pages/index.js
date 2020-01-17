import React from 'react'
import g from 'glamorous'

import { rhythm } from '../utils/typography'
import Link from 'gatsby-link'
import Layout from '../components/layout'

export default ({ location, data }) => {
  data.allText.edges.map(({ node }, i) => {
    const fontFace = new FontFace(
      `font-obfuscator-${i}`,
      `url(data:application/x-font-woff;charset=utf-8;base64,${node.content.fonts.woff}) format('woff')`
    )
    document.fonts.add(fontFace)
    console.log('loaded ', fontFace)

    return fontFace
  })

  return (
    <Layout location={location} data={data}>
      <g.H1 display={'inline-block'} borderBottom={'1px solid'}>
        {data.allText.edges.map(({ node }, i) => (
          <p
            style={{
              fontFamily: `font-obfuscator-${i}`,
              color: 'red',
            }}
            dangerouslySetInnerHTML={{ __html: node.content.html }}
          />
        ))}
      </g.H1>

      <h4>{data.allWordpressPost.totalCount} Posts</h4>
      {data.allWordpressPost.edges.map(({ node }) => (
        <div key={node.id}>
          <Link
            to={`/post/` + node.slug}
            css={{ textDecoration: `none`, color: `inherit` }}
          >
            <g.H3 marginBottom={rhythm(1 / 4)}>
              {node.title}
              <g.Span color="#BBB">— {node.date}</g.Span>
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
    allText {
      totalCount
      edges {
        node {
          id
          content {
            fonts {
              ttf
              woff
              woff2
            }
            html
          }
        }
      }
    }
  }
`
