import React from 'react';

export default ({data}) =>
    <div>
        <h1>About {data.site.siteMetadata.title}</h1>
        <p>I started practicing Yoga 2 years ago, and some magics had happen on
            me.</p>
    </div>


export const query = graphql`
    query AboutQuery {
        site {
            siteMetadata {
                title
            }
        }
    }
`
