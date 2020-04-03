import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const Nav = () => {
  const { allShopifyCollection } = useStaticQuery(
    graphql`
      query allShopifyCollections {
        allShopifyCollection {
          edges {
            node {
              title
              handle
              id
            }
          }
        }
      }
    `
  )
  return (
    <nav>
      {allShopifyCollection.edges.map(edge => {
        return (
          <Link
            key={edge.id}
            style={{
              color: "var(--grey)",
              marginLeft: "2rem",
            }}
            to={`/${edge.node.handle}`}
          >
            {edge.node.title}
          </Link>
        )
      })}
    </nav>
  )
}

export default Nav
