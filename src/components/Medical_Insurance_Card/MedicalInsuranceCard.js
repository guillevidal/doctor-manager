import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Table } from "semantic-ui-react"

import "./MedicalInsuranceCard.scss"

const MedicalInsuranceCard = () => {
  const patient = useSelector((state) => state.patient)
  const {
    general_practitioner,
    general_practitioner_phone,
    medical_treatment,
    tooth_info,
    allergies,
  } = patient.medical_record
  useEffect(() => {}, [])

  return (
    <div className="card_wrapper">
      <div className="card_wrapper_table">
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={4}>Medico de cabecera</Table.Cell>
              <Table.Cell>{general_practitioner}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={4}>
                Numero de telefono del medico de cabecera
              </Table.Cell>
              <Table.Cell>{general_practitioner_phone}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={4}>Tratamiento medico</Table.Cell>
              <Table.Cell>{medical_treatment}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={4}>Le sangran los dientes?</Table.Cell>
              <Table.Cell>{tooth_info}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={4}>Alergias</Table.Cell>
              <Table.Cell>{allergies}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default MedicalInsuranceCard
