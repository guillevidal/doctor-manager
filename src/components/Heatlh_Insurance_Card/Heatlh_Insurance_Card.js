import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Table } from "semantic-ui-react"

import "./Heatlh_Insurance_Card.scss"

const Heatlh_Insurance_Card = () => {
  const patient = useSelector((state) => state.patient)
  const { health_insurance, health_insurance_cod } = patient.health_insurance
  useEffect(() => {}, [])

  return (
    <div className="card_wrapper">
      <div className="card_wrapper_table">
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={4}>Seguro medico</Table.Cell>
              <Table.Cell>{health_insurance}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={4}>Codigo</Table.Cell>
              <Table.Cell>{health_insurance_cod}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default Heatlh_Insurance_Card
