"use client";
import React, { ReactNode } from 'react'
import { Provider } from "react-redux"
import { store } from "@/store"
const Maincomponent = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <div>
        {children}
      </div>
    </Provider>
  )
}

export default Maincomponent
