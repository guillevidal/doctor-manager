import React from "react"
import { cleanQuery, startSearch, finishSearch } from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { Search, Grid, Header, Segment } from "semantic-ui-react"
import firebase from "../../utils/Firebase"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
const db = firebase.firestore(firebase)

function SearchExampleStandard() {
  const loading = useSelector((state) => state.loading)
  const value = useSelector((state) => state.value)
  const patient = useSelector((state) => state.patient)
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
      if (data.value.length > 7) {
        try {
          const patientFromDb = await db
            .collection("pacientes")
            .doc(data.value)
            .get()
          const patientFound = patientFromDb.data()
          dispatch(finishSearch(patientFound))
        } catch (error) {
          dispatch(finishSearch({}))
        }
      }
    }, 300)
  }, [])
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <Grid>
      <Grid.Column width={6}>
        <Search
          loading={loading}
          onSearchChange={handleSearchChange}
          value={value}
          showNoResults={false}
        />
      </Grid.Column>

      <Grid.Column width={10}>
        <Segment>
          <Header>State</Header>
          <pre style={{ overflowX: "auto" }}>
            {JSON.stringify({ loading, value, patient }, null, 2)}
          </pre>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default SearchExampleStandard
