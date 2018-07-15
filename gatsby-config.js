module.exports = {
    siteMetadata: {
        title: 'A Yoga Man | 瑜伽男',
    },
    plugins: ['gatsby-plugin-react-helmet', 'gatsby-plugin-glamor', {
        resolve: 'gatsby-plugin-typography',
        options: {
            pathToConfigModule: 'src/utils/typography'
        }
    }],
}
