import React, { createContext, useState } from "react"

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [render, setRender] = useState(false)
  return (
    <DataContext.Provider
      value={{
        render,
        setRender,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
