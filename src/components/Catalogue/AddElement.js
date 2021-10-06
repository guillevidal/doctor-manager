import React from "react"
import { Icon, Menu, Table, Form } from "semantic-ui-react"
//

//
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
//
import "./AddElement.scss"

// Const global scope

export const AddElement = () => {
  return (
    <div>
      <Table celled size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Codigo</Table.HeaderCell>
            <Table.HeaderCell>Descripción</Table.HeaderCell>
            <Table.HeaderCell>Costo variable</Table.HeaderCell>
            <Table.HeaderCell>Costo Taller</Table.HeaderCell>
            <Table.HeaderCell>Costo Total</Table.HeaderCell>
            <Table.HeaderCell>Honor. Prof</Table.HeaderCell>
            <Table.HeaderCell>Total Arancel</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Form.Field>
                <Form.Input type="password" />
              </Form.Field>
            </Table.Cell>
            <Table.Cell>
              <Form.Field>
                <Form.Input type="password" />
              </Form.Field>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Form.Field>
                <Form.Input type="password" />
              </Form.Field>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Form.Field>
                <Form.Input type="password" />
              </Form.Field>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Form.Field>
                <Form.Input type="password" />
              </Form.Field>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Form.Field>
                <Form.Input type="password" />
              </Form.Field>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Form.Field>
                <Form.Input type="password" />
              </Form.Field>
              <Form.Field>
                <Form.Input type="password" />
              </Form.Field>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  )
}
