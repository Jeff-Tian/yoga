const path = require(`path`);
const {createFilePath} = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({node, getNode, boundActionCreators}) => {
    const {createNodeField} = boundActionCreators
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({node, getNode, basePath: `pages`})
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
    }
};

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({page, boundActionCreators}) => {
    const {createPage} = boundActionCreators;

    // page.matchPath is a special key that's used for matching pages
    // only on the client.
    if (page.path.match(/^\/app/)) {
        page.matchPath = "/app/:path";

        // Update the page.
        createPage(page);
    }
};

exports.createPages = ({graphql, boundActionCreators}) => {
    const {createPage} = boundActionCreators

    return new Promise((resolve, reject) => {
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
    `
        ).then(result => {
            result.data.allMarkdownRemark.edges.forEach(({node}) => {
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
};
