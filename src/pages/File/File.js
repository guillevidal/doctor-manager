import React, { useState } from "react";
import { Icon, Label, Menu, Table, Form, Button } from "semantic-ui-react";

//
import firebase from "../../utils/Firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

//
import "./File.scss";
const db = firebase.firestore(firebase);

const File = () => {
  const [codigo, setCodigo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [costoV, setCostoV] = useState("");
  const [costoTa, setCostoTa] = useState("");
  const [costoT, setCostoT] = useState("");
  const [honorP, setHonorP] = useState("");
  const [totalA, setTotalA] = useState("");

  const handleChange = (e) => {
    if (e.target.name == "codigo") {
      setCodigo(e.target.value);
    }
    if (e.target.name == "descripcion") {
      setDescripcion(e.target.value);
    }
    if (e.target.name == "costoV") {
      setCostoV(e.target.value);
    }
    if (e.target.name == "costoTa") {
      setCostoTa(e.target.value);
    }
    if (e.target.name == "costoT") {
      setCostoT(e.target.value);
    }
    if (e.target.name == "honorP") {
      setHonorP(e.target.value);
    }
    if (e.target.name == "totalA") {
      setTotalA(e.target.value);
    }

    // console.log(e.target.name);
  };
  const handleButtonSend = () => {
    console.log(codigo);
    console.log(descripcion);
    console.log(costoV);
    console.log(costoTa);
    console.log(costoT);
    console.log(honorP);
    console.log(totalA);
  };
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
                <Form.Input
                  size="mini"
                  type="text"
                  name="codigo"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </Form.Field>
            </Table.Cell>
            <Table.Cell>
              <Form.Field>
                <Form.Input
                  size="mini"
                  type="text"
                  name="descripcion"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Field>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Form.Field>
                <Form.Input
                  size="mini"
                  type="text"
                  name="costoV"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Field>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Form.Field>
                <Form.Input
                  size="mini"
                  type="text"
                  name="costoTa"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Field>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Form.Field>
                <Form.Input
                  size="mini"
                  type="text"
                  name="costoT"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Field>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Form.Field>
                <Form.Input
                  size="mini"
                  type="text"
                  name="honorP"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Field>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Form.Field>
                <Form.Input
                  size="mini"
                  type="text"
                  name="totalA"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Field>
            </Table.Cell>

            <Table.Cell>
              {/* <Button className="ui inverted blue button" icon="plus"></Button> */}
              <Button
                className="ui inverted blue button"
                icon="pencil"
                onClick={() => handleButtonSend()}
              ></Button>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="8">
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
  );
};

export default File;
