import React, { useEffect,useRef } from "react";
import { Switch, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import Pacient from "../pages/Pacient";
import CompleteRecord from "../components/Patient/CompleteRecord";
export default function Routes(props) {
  const { user, setReloadApp } = props;
  let isRendered = useRef(false);

  useEffect(() => {
    isRendered = true;

    return () => {
      isRendered = false;
    };
  }, []);

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
      <Route path="/complete" exact>
        <CompleteRecord />
      </Route>
    </Switch>
  );
}
