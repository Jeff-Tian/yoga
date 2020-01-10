const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, boundActionCreators, reporter }) => {
  const { createPage } = boundActionCreators

  const markdownPostsPromise = new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        console.log('node = ', node.fields.slug)

        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/blog-post.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        })
      })
      resolve()
    })
  })
  const wordpressPostsPromise = async () => {
    const result = await graphql(`
      {
        allWordpressPost {
          edges {
            node {
              slug
              wordpress_id
            }
          }
        }
      }
    `)

    if (result.errors) {
      reporter.panicOnBuild(
        `Error while running GraphQL query: ${JSON.stringify(result.errors)}`
      )

      return
    }

    const posts = result.data.allWordpressPost.edges
    posts.forEach(post => {
      console.log('node = ', post.node.slug)

      createPage({
        path: `post/${post.node.slug}`,
        component: path.resolve(`./src/templates/wordpress-post.js`),
        context: {
          id: post.node.wordpress_id,
          slug: post.node.wordpress_id,
        },
      })
    })
  }
  return Promise.all([markdownPostsPromise, wordpressPostsPromise()])
}
