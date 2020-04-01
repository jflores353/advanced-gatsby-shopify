import React, { createContext, useState, useEffect } from "react"
import Client from "shopify-buy"

const client = Client.buildClient({
  domain: "advanced-gatsby.myshopify.com",
  storefrontAccessToken: "9f3c2217037981549bd3b20a6ee0759b",
})

const defaultValues = {
  isCartOpen: false,
  toggleCartOpen: () => {},
  cart: [],
  addProductToCart: () => {},
  checkCoupon: () => {},
  client,
  checkout: {
    lineItems: [],
  },
  removeProductFromCart: () => {},
}

export const StoreContext = createContext(defaultValues)

export const StoreProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(defaultValues.checkout)
  const [isCartOpen, setCartOpen] = useState(false)

  const toggleCartOpen = () => {
    setCartOpen(!isCartOpen)
  }

  useEffect(() => {
    initializeCheckout()
  }, [])

  const isBrowser = typeof window !== "undefined"

  const getNewId = async () => {
    try {
      const newCheckout = await client.checkout.create()
      if (isBrowser) {
        localStorage.setItem("checkout_id", newCheckout.id)
      }
      return newCheckout
    } catch (e) {
      console.error(e)
    }
  }

  const initializeCheckout = async () => {
    try {
      //* Check if id exists
      const currentCheckoutId = isBrowser
        ? localStorage.getItem("checkout_id")
        : null

      let newCheckout = null

      if (currentCheckoutId) {
        //* If id exists, fetch checkout from Shopify
        newCheckout = await client.checkout.fetch(currentCheckoutId)
        if (newCheckout.completedAt) {
          newCheckout = await getNewId()
        }
      } else {
        //* If id does not, create new checkout
        newCheckout = await getNewId()
      }

      //* Set checkout to State
      setCheckout(newCheckout)
    } catch (e) {
      console.error(e)
    }
  }

  const addProductToCart = async variantId => {
    try {
      const lineItems = [
        {
          variantId,
          quantity: 1,
        },
      ]
      const newCheckout = await client.checkout.addLineItems(
        checkout.id,
        lineItems
      )
      //* Next line will create a buy now option
      //  window.open(addItems.webUrl, "_blank")
      setCheckout(newCheckout)
      // console.log(addItems.webUrl)
    } catch (e) {
      console.error(e)
    }
  }

  const removeProductFromCart = async lineItemId => {
    try {
      const newCheckout = await client.checkout.removeLineItems(checkout.id, [
        lineItemId,
      ])
      //* Next line will create a buy now option
      //  window.open(addItems.webUrl, "_blank")
      setCheckout(newCheckout)
      // console.log(addItems.webUrl)
    } catch (e) {
      console.error(e)
    }
  }

  const checkCoupon = async coupon => {
    const newCheckout = await client.checkout.addDiscount(checkout.id, coupon)
    setCheckout(newCheckout)
  }

  const removeCoupon = async coupon => {
    const newCheckout = await client.checkout.removeDiscount(
      checkout.id,
      coupon
    )
    setCheckout(newCheckout)
  }

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        checkout,
        addProductToCart,
        toggleCartOpen,
        isCartOpen,
        removeProductFromCart,
        checkCoupon,
        removeCoupon,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
