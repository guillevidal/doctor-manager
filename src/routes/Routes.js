import React from "react";
import { Switch, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import Pacient from "../pages/Pacient";
import File from "../pages/File";
export default function Routes(props) {
  const { user, setReloadApp, render, setRender } = props;

  return (
    <Switch>
      <Route path="/" exact>
        <Home render={render} setRender={setRender} />
      </Route>
      <Route path="/archivo" exact>
        <File user={user}/>
      </Route>
      <Route path="/settings" exact>
        <Settings user={user} setReloadApp={setReloadApp}>
          Ajustes
        </Settings>
      </Route>
      <Route path="/pacient" exact>
        <Pacient />
      </Route>
    </Switch>
  );
}
