import React, { useEffect, useState } from "react"
import { Grid } from "semantic-ui-react"
import SearchExampleStandard from "../../components/SearchBar"
import MenuOptionsCard from "../../components/MenuOptionsCard"
import Personal_Info_Display from "../../components/Personal_Info_Display"

import AffectionsDisplay from "../../components/AffectionsDisplay"
import Medical_Record_Display from "../../components/Medical_Records_Display"
import catalogo from "../../utils/catalogoObject"
import { useDispatch } from "react-redux"
// css
import "react-confirm-alert/src/react-confirm-alert.css"
import { catalogue } from "../../redux/actions"

const Home = () => {
  const [activeItem, setActiveItem] = useState("personal_info")

  const handlerForm = () => {
    switch (activeItem) {
      case "personal_info":
        return <Personal_Info_Display />
      case "medical_record":
        return <Medical_Record_Display />
      case "affections":
        return <AffectionsDisplay />
      default:
        return true
    }
  }
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(catalogue(catalogo))
  }, [])
  useEffect(() => {}, [])
  return (
    <Grid>
      <Grid.Column width={16}>
        <SearchExampleStandard />
      </Grid.Column>
      <Grid.Column width={16}>
        <MenuOptionsCard
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
        {handlerForm()}
      </Grid.Column>
    </Grid>
  )
}

export default Home
