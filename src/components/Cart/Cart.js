import React, { useContext } from "react"
import { StoreContext } from "../../Context/StoreContext"
import { animated } from "react-spring"

const Cart = ({ style }) => {
  const {
    isCartOpen,
    toggleCartOpen,
    checkout,
    removeProductFromCart,
  } = useContext(StoreContext)
  console.log(checkout.lineItems)
  return (
    <animated.div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "30%",
        height: "100%",
        background: "white",
        boxShadow: "var(--elevation-4)",
        padding: 60,
        zIndex: 100,
        ...style,
      }}
    >
      <button
        style={{
          background: "var(--red)",
          position: "absolute",
          top: 10,
          right: 10,
        }}
        className="delete is-large"
        onClick={toggleCartOpen}
      >
        Close Cart
      </button>
      <h3 className="title">Cart</h3>
      {checkout.lineItems.map(item => (
        <div key={item.id} style={{ display: "flex", marginBottom: "2rem" }}>
          <div
            style={{
              width: 60,
              height: 80,
              overflow: "hidden",
              marginRight: 10,
            }}
          >
            <img src={item.variant.image.src} alt="product image" />
          </div>
          <div>
            <h4 className="title is-4">{item.title}</h4>
            <p className="subtitle is-5">Qty: {item.quantity}</p>
            <p className="subtitle is-5">${item.variant.price}</p>
            <button
              onClick={() => removeProductFromCart(item.id)}
              className="is-small button is-danger is-outlined"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <hr />
      <div className="subtitle is-5">
        Total:<h5 className="title">${checkout.totalPrice}</h5>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <a href={checkout.webUrl} className="button is-fullwidth is-success">
          Pay Now
        </a>
      </div>
    </animated.div>
  )
}

export default Cart
