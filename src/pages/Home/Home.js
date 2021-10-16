import React, { useEffect, useState } from "react"
import { Grid } from "semantic-ui-react"
import SearchExampleStandard from "../../components/SearchBar"
import Card from "../../components/Card"

import MenuOptionsCard from "../../components/MenuOptionsCard"
// css
import "react-confirm-alert/src/react-confirm-alert.css"

const Home = () => {
  const [activeItem, setActiveItem] = useState("personal_info")

  const handlerForm = () => {
    switch (activeItem) {
      case "personal_info":
        return <Card />
      case "medical_insurance":
        return <h1>Ficha Medica</h1>
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
