import React from "react"

import github from "../images/github-large.png"

export default function Footer() {
  return (
    <div>
      <footer
        className="level is-mobile"
        style={{
          background: "var(--green)",
          color: "var(--darkGreen)",
          height: "12vh",
          boxShadow: "var(--elevation-0)",
          marginBottom: 0,
        }}
      >
        <div className="level-left">
          <a
            href="https://github.com/jflores353/advanced-gatsby-shopify"
            className="navbar-item"
            style={{ background: "transparent", color: "inherit" }}
          >
            <img
              className="button"
              style={{
                height: 60,
                maxHeight: "none",
                margin: 0,
                background: "transparent",
                border: "none",
              }}
              src={github}
              alt="Github Link to Repository"
            />
            Link to Repository
          </a>
        </div>
        <div className="level-right">
          <a
            href="https://www.gabeflores.dev/"
            className="navbar-item"
            style={{
              background: "transparent",
              marginRight: "1rem",
              color: "inherit",
            }}
          >
            gabeflores.dev
          </a>
        </div>
      </footer>
    </div>
  )
}
