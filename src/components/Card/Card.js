import React from "react"
import { useSelector } from "react-redux"

import { Divider, Header, Icon, Table } from "semantic-ui-react"

const Card = () => {
  const patient = useSelector((state) => state.patient)
  return (
    <>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="tag" />
          Información personal
        </Header>
      </Divider>

      <p>Acá se muestra la información básica del paciente</p>

      <Divider horizontal>
        <Header as="h4">
          <Icon name="info circle" />
          Info general
        </Header>
      </Divider>

      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={4}>Nombre y apellido</Table.Cell>
            <Table.Cell>
              {patient.name} {patient.surname}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Numero de telefono</Table.Cell>
            <Table.Cell>{patient.phone_number}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Obra social</Table.Cell>
            <Table.Cell>{patient.medical_insurance}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Edad</Table.Cell>
            <Table.Cell>{patient.age}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Domicilio</Table.Cell>
            <Table.Cell>Not Much Usually</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  )
}

export default Card
