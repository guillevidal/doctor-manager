import React, { useEffect, useState } from "react"
import { Grid } from "semantic-ui-react"
import SearchExampleStandard from "../../components/SearchBar"
import MenuOptionsCard from "../../components/MenuOptionsCard"
import Personal_Info_Display from "../../components/Personal_Info_Display"
import Heatlh_Insurance_Display from "../../components/Heatlh_Insurance_Card"
import AffectionsDisplay from "../../components/AffectionsDisplay"
import Medical_Record_Display from "../../components/Medical_Records_Display"
// css
import "react-confirm-alert/src/react-confirm-alert.css"

const Home = () => {
  const [activeItem, setActiveItem] = useState("personal_info")

  const handlerForm = () => {
    switch (activeItem) {
      case "personal_info":
        return <Personal_Info_Display />
      case "medical_insurance":
        return <Medical_Record_Display />
      case "affections":
        return <AffectionsDisplay />
      case "health_insurance":
        return <Heatlh_Insurance_Display />
    }
  }
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
