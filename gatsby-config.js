module.exports = {
    siteMetadata: {
        title: 'A Yoga Man | 瑜伽男',
    },
    plugins: ['gatsby-plugin-react-helmet', 'gatsby-plugin-glamor', `gatsby-transformer-remark`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `src`,
                path: `${__dirname}/src/`,
            },
        }, {
            resolve: 'gatsby-plugin-typography',
            options: {
                pathToConfigModule: 'src/utils/typography'
            }
        }],
}
