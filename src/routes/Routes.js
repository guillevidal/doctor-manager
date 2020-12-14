import React from 'react'
import {Switch,Route} from 'react-router-dom';

// Pages
import Home from "../pages/Home";

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact >
                <Home />
            </Route>
            <Route path="/archivo" exact >
                <h1>Archivo</h1>
            </Route>
            <Route path="settings" exact >
                <h1>Ajustes</h1>
            </Route>
        </Switch>
    )
}
