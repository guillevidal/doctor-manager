import React from "react"
import ReactDOM from "react-dom"

import App from "./App"
import * as serviceWorker from "./serviceWorker"

import "semantic-ui-css/semantic.min.css"
import "react-toastify/dist/ReactToastify.css"
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "./index.scss"

ReactDOM.render(<App />, document.getElementById("root"))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.unregister()
