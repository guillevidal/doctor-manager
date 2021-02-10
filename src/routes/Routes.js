import React from "react";
import { Switch, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import Pacient from "../pages/Pacient";

export default function Routes(props) {
  const { user, setReloadApp } = props;


  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/archivo" exact>
        <h1>Archivo</h1>
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
