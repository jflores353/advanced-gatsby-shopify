import React from "react"
import { StoreProvider } from "./src/Context/StoreContext"

export const wrapRootElement = ({ element }) => (
  <StoreProvider>{element}</StoreProvider>
)
