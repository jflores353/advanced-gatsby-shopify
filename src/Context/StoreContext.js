import React, { createContext, useState, useEffect } from "react"
import Client from "shopify-buy"

const client = Client.buildClient({
  domain: "advanced-gatsby.myshopify.com",
  storefrontAccessToken: "9f3c2217037981549bd3b20a6ee0759b",
})

const defaultValues = {
  isCartOpen: false,
  cart: [],
  addProductToCart: () => {},
  client,
  checkout: {
    lineItems: [],
  },
}

export const StoreContext = createContext(defaultValues)

export const StoreProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(defaultValues.checkout)

  useEffect(() => {
    initializeCheckout()
  }, [])

  const initializeCheckout = async () => {
    try {
      //* 1st need to check if it's a browser(if window exists)
      const isBrowser = typeof window !== "undefined"

      //* Check if id exists
      const currentCheckoutId = isBrowser
        ? localStorage.getItem("checkout_id")
        : null

      let newCheckout = null

      if (currentCheckoutId) {
        //* If id exists, fetch checkout from Shopify
        newCheckout = await client.checkout.fetch(currentCheckoutId)
      } else {
        //* If id does not, create new checkout
        newCheckout = await client.checkout.create()
        if (isBrowser) {
          localStorage.setItem("checkout_id", newCheckout.id)
        }
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
  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        checkout,
        addProductToCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
