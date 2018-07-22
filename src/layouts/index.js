import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import {css} from 'glamor';
import g from 'glamorous';
import {rhythm} from '../utils/typography';
import Link from 'gatsby-link'

import Header from '../components/header'
import './index.css'

const linkStyle = css({float: 'right'})

const Layout = ({children, data}) => (
    <div>
        <Helmet
            title={data.site.siteMetadata.title}
            meta={[
                {name: 'description', content: 'Sample'},
                {name: 'keywords', content: 'sample, something'},
            ]}
        />
        <Header siteTitle={data.site.siteMetadata.title}/>

        <g.Div margin={`0 auto`} maxWdith={700} padding={rhythm(2)}
               paddingTop={rhythm(1.5)}>
            <Link to={`/`}>
                <g.H3 marginBottom={rhythm(2)} display={`inline-block`}>
                    {data.site.siteMetadata.title}
                </g.H3>
            </Link>
            <Link className={linkStyle} to={`/about`}>
                About
            </Link>
        </g.Div>

        <div
            style={{
                margin: '0 auto',
                maxWidth: 960,
                padding: '0px 1.0875rem 1.45rem',
                paddingTop: 0,
            }}
        >
            {children()}
        </div>
    </div>
)

Layout.propTypes = {
    children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
