import React from "react"
import { useSelector } from "react-redux"

import { Label } from "semantic-ui-react"

import "./Affections_Card.scss"

const Affections_Card = () => {
  const patient = useSelector((state) => state.patient)

  return (
    <div className="medical_record">
      <div className="medical_record_labels">
        {patient.medical_record.affections.map((affection) => {
          return (
            <Label key={affection} color="red" size="huge">
              {affection}
            </Label>
          )
        })}
      </div>
    </div>
  )
}

export default Affections_Card
