import React, { useEffect } from "react"
import { Grid } from "semantic-ui-react"
import SearchExampleStandard from "../../components/SearchBar"
import Card from "../../components/Card"

// css
import "react-confirm-alert/src/react-confirm-alert.css"

const Home = () => {
  useEffect(() => {}, [])
  return (
    <Grid>
      <Grid.Column width={16}>
        <SearchExampleStandard />
      </Grid.Column>
      <Grid.Column width={16}>
        <Card />
      </Grid.Column>
    </Grid>
  )
}

export default Home
