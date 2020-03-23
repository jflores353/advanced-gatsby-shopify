import React, { createContext, useState } from "react"
import Client from "shopify-buy"

const client = Client.buildClient({
  domain: "advanced-gatsby.myshopify.com",
  storefrontAccessToken: "9f3c2217037981549bd3b20a6ee0759b",
})

export const defaultValues = {
  isCartOpen: false,
  cart: [],
  addProductToCart: () => {},
  client,
}

export const StoreContext = createContext({ defaultValues })

export const StoreProvider = ({ children }) => {
  const addProductToCart = async variantId => {
    try {
      const newCheckout = await client.checkout.create()
      const lineItems = [
        {
          variantId,
          quantity: 1,
        },
      ]
      const addItems = await client.checkout.addLineItems(
        newCheckout.id,
        lineItems
      )
      //* Next line will create a buy now option
      // window.open(addItems.webUrl, "_blank")
      console.log(addItems.webUrl)
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <StoreContext.Provider value={{ ...defaultValues, addProductToCart }}>
      {children}
    </StoreContext.Provider>
  )
}
