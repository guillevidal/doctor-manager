import React, { useEffect, useState } from "react"
import { Grid } from "semantic-ui-react"
import SearchExampleStandard from "../../components/SearchBar"
import MenuOptionsCard from "../../components/MenuOptionsCard"
import Card from "../../components/Card"
import MedicalInsuranceCard from "../../components/Medical_Insurance_Card/MedicalInsuranceCard"
import Affections_Card from "../../components/Affections_Card/Affections_Card"
import Heatlh_Insurance_Card from "../../components/Heatlh_Insurance_Card"
// css
import "react-confirm-alert/src/react-confirm-alert.css"

const Home = () => {
  const [activeItem, setActiveItem] = useState("personal_info")

  const handlerForm = () => {
    switch (activeItem) {
      case "personal_info":
        return <Card />
      case "medical_insurance":
        return <MedicalInsuranceCard />
      case "affections":
        return <Affections_Card />
      case "health_insurance":
        return <Heatlh_Insurance_Card />
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
