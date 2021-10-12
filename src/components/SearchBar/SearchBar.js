import React, { useState } from "react"
import { cleanQuery, startSearch, finishSearch } from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { Search, Icon } from "semantic-ui-react"
import firebase from "../../utils/Firebase"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
import "./SearchBar.scss"
import { toast } from "react-toastify"

const db = firebase.firestore(firebase)

function SearchExampleStandard() {
  const loading = useSelector((state) => state.loading)
  const value = useSelector((state) => state.value)
  const [error, setError] = useState(false)
  const dispatch = useDispatch()

  const timeoutRef = React.useRef()
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current)
    dispatch(startSearch(data.value))

    timeoutRef.current = setTimeout(async () => {
      if (data.value.length === 0) {
        dispatch(cleanQuery())
        return
      }
      if (data.value.length >= 7) {
        await db
          .collection("pacientes")
          .doc(data.value)
          .get()
          .then((patient) => {
            if (patient.exists) {
              const patientFound = patient.data()
              dispatch(finishSearch(patientFound))
              setError(false)
              toast.success("Busqueda exitosa")
            } else {
              setError(true)
            }
          })
      }
    }, 300)
  }, [])
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div className="search_wrapper">
      <Search
        loading={loading}
        onSearchChange={handleSearchChange}
        maxLength={8}
        value={value}
        showNoResults={false}
      />
      {error ? (
        <div className="error-text">
          <p>No se encuentra el paciente</p>
          <Icon name="warning circle" size="big" />
        </div>
      ) : null}
    </div>
  )
}

export default SearchExampleStandard
