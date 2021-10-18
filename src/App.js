import React, { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import firebase from "./utils/Firebase"
import catalogoObject from "./utils/catalogoObject"
import "firebase/auth"
import Auth from "./pages/Auth"
import { catalogue } from "./redux/actions"
import LoggedLayout from "./layouts/LoggedLayout"
import { DataProvider } from "./context/DataContext"
import store from "./redux/store"
import { Provider, useDispatch } from "react-redux"

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [reloadApp, setReloadApp] = useState(false)
  const dispatch = useDispatch()
  const fullCatalogo = catalogoObject()
  useEffect(() => {
    dispatch(catalogue(fullCatalogo))
  }, [])

  firebase.auth().onAuthStateChanged((currentUser) => {
    if (currentUser !== null) {
      if (!currentUser.emailVerified) {
        firebase.auth().signOut()
        setUser(null)
      } else {
        setUser(currentUser)
      }
    }
    setIsLoading(false)
  })

  if (isLoading) {
    return null
  }

  return (
    <Provider store={store}>
      <DataProvider>
        {!user ? (
          <Auth />
        ) : (
          <LoggedLayout
            user={user}
            reloadApp={reloadApp}
            setReloadApp={setReloadApp}
          />
        )}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          puaseOnVisibilityChange
          draggable
          pauseOnHover={false}
        />
      </DataProvider>
    </Provider>
  )
}

export default App
