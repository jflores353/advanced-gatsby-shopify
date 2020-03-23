import React, { createContext, useState } from "react"

export const defaultValues = {
  isCartOpen: false,
  cart: [],
  addProductToCart: () => {
    console.log("Added to Cart!")
  },
}

export const StoreContext = createContext({ defaultValues })

export const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={defaultValues}>
      {children}
    </StoreContext.Provider>
  )
}
