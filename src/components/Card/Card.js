import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Divider, Header, Icon, Table } from "semantic-ui-react"
import { getEdad } from "../../utils/utils"

import "./Card.scss"

const Card = () => {
  const patient = useSelector((state) => state.patient)
  const [edad, setEdad] = useState("...")
  const { name, surname, dni, birthdate, address, phone_number } =
    patient.info_personal
  useEffect(() => {
    if (typeof birthdate.seconds === "number") {
      const date = new Date(birthdate.seconds * 1000).toISOString()
      const now = getEdad(date)
      setEdad(now)
    }
  }, [birthdate])

  return (
    <div className="card_wrapper">
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
      <div className="card_wrapper_table">
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={4}>Nombre y apellido</Table.Cell>
              <Table.Cell>
                {name} {surname}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={4}>DNI</Table.Cell>
              <Table.Cell>{dni}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Numero de telefono</Table.Cell>
              <Table.Cell>{phone_number}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Edad</Table.Cell>
              <Table.Cell>{edad}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Domicilio</Table.Cell>
              <Table.Cell>{address}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default Card
