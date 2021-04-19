import React,{useState} from "react";
import { Grid } from "semantic-ui-react";
import Routes from "../../routes/Routes";
import { BrowserRouter as Router } from "react-router-dom";
import MenuLeft from "../../components/MenuLeft";
import TopBar from "../../components/TopBar";

import "./LoggedLayout.scss";
export default function LoggedLayout(props) {
  const { user,setReloadApp } = props;
  const [render, setRender] = useState(false);

  return (
    <Router>
      <Grid className="logged-layout">
        <Grid.Row>
          <Grid.Column width={3}>
            <MenuLeft  render={render} setRender={setRender} user={user}/>
          </Grid.Column>
          <Grid.Column className="content" width={13}>
            <TopBar user={user} />

            <Routes render={render} setRender={setRender} user={user} setReloadApp={setReloadApp}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <h2>Player</h2>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Router>
  );
}
