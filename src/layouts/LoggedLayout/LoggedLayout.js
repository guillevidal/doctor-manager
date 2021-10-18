import React from "react"
import { Grid } from "semantic-ui-react"
import Routes from "../../routes/Routes"
import { BrowserRouter as Router } from "react-router-dom"
import MenuLeft from "../../components/MenuLeft"
import TopBar from "../../components/TopBar"
import YourSvg from "../../assets/png/logo.png"
import "./LoggedLayout.scss"
export default function LoggedLayout(props) {
  const { user, setReloadApp } = props

  return (
    <Router>
      <TopBar user={user} />

      <Grid className="logged-layout">
        <Grid.Row>
          <Grid.Column width={2}>
            <MenuLeft user={user} />
          </Grid.Column>
          <Grid.Column className="content" width={14}>
            <Routes user={user} setReloadApp={setReloadApp} />
          </Grid.Column>
          {/* <Grid.Column className="content" width={5}>
            <MenuLeft user={user} />
          </Grid.Column> */}
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <div className="logo_div">
              <img src={YourSvg} />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Router>
  )
}
