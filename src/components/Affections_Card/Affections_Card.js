import React from "react"
import { useSelector } from "react-redux"

import { Label } from "semantic-ui-react"

import "./Affections_Card.scss"

const Affections_Card = () => {
  const patient = useSelector((state) => state.patient)

  return (
    <div>
      {patient.medical_record.affections.map((affection) => {
        return (
          <Label color="red" key={affection} size="huge">
            {affection}
          </Label>
        )
      })}
    </div>
  )
}

export default Affections_Card
