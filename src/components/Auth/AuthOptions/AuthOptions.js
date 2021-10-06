import React from "react"
import { Button } from "semantic-ui-react"

import "./AuthOptions.scss"

export default function AuthOptions(props) {
  const { setSelectedForm } = props

  return (
    <div className="auth-options">
      <h2>La mejor interfaz para dentistas</h2>
      <Button className="login" onClick={() => setSelectedForm("login")}>
        Iniciar sesión
      </Button>
    </div>
  )
}
