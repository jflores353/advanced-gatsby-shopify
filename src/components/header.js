import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { useTransition } from "react-spring"
import { FaShoppingCart } from "react-icons/fa"
import "../style.scss"
import { StoreContext } from "../Context/StoreContext"
import logo from "../images/bee-logo.png"
import Cart from "./Cart/Cart"
import Loader from "./Loader"
import Nav from "./Nav"

const Header = ({ siteTitle }) => {
  const { isCartOpen, toggleCartOpen, checkout } = useContext(StoreContext)

  const transitions = useTransition(isCartOpen, null, {
    from: { transform: "translate3d(100%, 0, 0)" },
    enter: { transform: "translate3d(0, 0, 0)" },
    leave: { transform: "translate3d(100%, 0, 0)" },
  })
  const qty = checkout.lineItems.reduce((total, item) => {
    return total + item.quantity
  }, 0)
  return (
    <>
      <header
        className="level is-mobile"
        style={{ background: "var(--green)", boxShadow: "var(--elevation-2)" }}
      >
        <div className="level-left">
          <Link
            to="/"
            className="navbar-item"
            style={{ background: "transparent" }}
          >
            <img
              className="button"
              style={{
                height: 80,
                maxHeight: "none",
                margin: 0,
                background: "transparent",
                border: "none",
              }}
              src={logo}
              alt="Gatsby Ecommerce Logo"
            />
          </Link>
          <Nav />
        </div>
        <div className="level-right">
          <div className="navbar-item">
            <button
              className="button"
              style={{ background: "transparent", border: "none" }}
              onClick={toggleCartOpen}
            >
              {qty > 0 && (
                <div
                  style={{
                    color: "var(--grey)",
                    background: "var(--darkGreen)",
                    borderRadius: 15,
                    textAlign: "center",
                    height: 30,
                    width: 30,
                    lineHeight: "30px",
                    marginRight: 10,
                  }}
                >
                  {qty}
                </div>
              )}

              <FaShoppingCart
                style={{ color: "var(--blue)", height: 30, width: 30 }}
              />
            </button>
          </div>
        </div>
        {transitions.map(
          ({ item, key, props }) => item && <Cart key={key} style={props} />
        )}
      </header>
      <Loader />
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
