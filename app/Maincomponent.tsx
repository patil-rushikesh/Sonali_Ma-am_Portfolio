"use client";
import React, { ReactNode } from 'react'
import { Provider } from "react-redux"
import { store } from "@/store"
import { Navigation } from '@/components/navigation';
const Maincomponent = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <div>
        <Navigation />
        {children}
      </div>
    </Provider>
  )
}

export default Maincomponent
