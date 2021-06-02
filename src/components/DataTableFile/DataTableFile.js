import React, { useState, useEffect } from "react";
import { Icon, Menu, Table, Form, Button, Input, Tab } from "semantic-ui-react";
//
import { Formik, Field } from "formik";
import * as Yup from "yup";
//
import { toast } from "react-toastify";
//
import { isUserAdmin } from "../../utils/Api";
//
import firebase from "../../utils/Firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
//
import "./DataTableFile.scss";
import { map } from "lodash";
const db = firebase.firestore(firebase);
//
const DataTableFile = (
  props,
  {
    cod = "",
    desc = "",
    costV = "",
    costTa = "",
    costT = "",
    honP = "",
    tA = "",
  }
) => {
  const { user } = props;
  const [codigo, setCodigo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [render, setRender] = useState(false);
  const [costoV, setCostoV] = useState("");
  const [costoF, setCostoF] = useState("");
  const [costoTa, setCostoTa] = useState("");
  const [costoT, setCostoT] = useState("");
  const [honorP, setHonorP] = useState("");
  const [totalA, setTotalA] = useState("");
  const [userAdmin, setuserAdmin] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await db
        .collection("registros")
        .get()
        .then(async (response) => {
          const arrayRegistros = [];
          map(response?.docs, (registro) => {
            const data = registro.data();
            data.id = registro.id;
            arrayRegistros.push(data);
          });

          setRegistros(arrayRegistros);
        });
    };
    getData();
    console.log("lo pido");
    isUserAdmin(user.uid).then((response) => setuserAdmin(response));
  }, [user, render]);

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
    <Formik
      initialValues={{
        cod,
        desc,
        costV,
        costTa,
        costT,
        honP,
        tA,
      }}
      validationSchema={Yup.object({
        cod: Yup.string()
          .min(4, "Debe tener al menos 4 caracteres")
          .max(8, "Solo puede tener hasta 8 caracteres")
          .required("Debe completar este campo"),
        desc: Yup.string()
          .max(30, "Maximo 30 caracteres")
          .required("Debe completar este campo"),
        costV: Yup.number()
          .typeError("Por favor ingrese un numero valido EJ: 10.20")
          .test(
            "maxDigitsAfterDecimal",
            "number field must have 2 digits after decimal or less",
            (number) => /^\d+(\.\d{1,2})?$/.test(number)
          )
          .required("Debe completar este campo"),
        costF: Yup.number()
          .typeError("Por favor ingrese un numero valido EJ: 10.20")
          .test(
            "maxDigitsAfterDecimal",
            "number field must have 2 digits after decimal or less",
            (number) => /^\d+(\.\d{1,2})?$/.test(number)
          )
          .required("Debe completar este campo"),
        costTa: Yup.number()
          .typeError("Por favor ingrese un numero valido EJ: 10.20")
          .test(
            "maxDigitsAfterDecimal",
            "number field must have 2 digits after decimal or less",
            (number) => /^\d+(\.\d{1,2})?$/.test(number)
          )
          .required("Debe completar este campo"),
        costT: Yup.number()
          .typeError("Por favor ingrese un numero valido EJ: 10.20")
          .test(
            "maxDigitsAfterDecimal",
            "number field must have 2 digits after decimal or less",
            (number) => /^\d+(\.\d{1,2})?$/.test(number)
          )
          .required("Debe completar este campo"),
        honP: Yup.number()
          .typeError("Por favor ingrese un numero valido EJ: 10.20")
          .test(
            "maxDigitsAfterDecimal",
            "number field must have 2 digits after decimal or less",
            (number) => /^\d+(\.\d{1,2})?$/.test(number)
          )
          .required("Debe completar este campo"),
        tA: Yup.number()
          .typeError("Por favor ingrese un numero valido EJ: 10.20")
          .test(
            "maxDigitsAfterDecimal",
            "number field must have 2 digits after decimal or less",
            (number) => /^\d+(\.\d{1,2})?$/.test(number)
          )
          .required("Debe completar este campo"),
      })}
      onSubmit={async (values, { resetForm }) => {
        const { cod, desc, costV, costTa, costT, honP, tA } = values;
        console.log(cod, desc, costV, costoTa, costT, honP, tA);

        setIsLoading(true);

        const data = {
          cod_id: cod,
          descripcion: desc,
          costo_variable: costV,
          costo_taller: costTa,
          costo_total: costT,
          honorarioP: honP,
          total_arancel: tA,
        };

        await db
          .collection("registros")
          .doc(cod)
          .set(data)
          .then(() => {
            toast.success("Registro guardado con exito");
            resetForm();
            setIsLoading(false);
          })
          .catch((error) => {
            toast.warning("Error al crear el registro");
            setIsLoading(false);
            console.log(error);
          });

        console.log(values);
      }}
    >
      {({ errors, touched, handleSubmit, handleChange, setFieldValue }) => {
        return (
          <div className="file-form">
            <Form onSubmit={handleSubmit} onChange={handleChange}>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width={2}>Codigo</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Descripción</Table.HeaderCell>
                    <Table.HeaderCell width={2}>
                      Costo variable
                    </Table.HeaderCell>
                    <Table.HeaderCell width={2}>Costo Fijo</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Costo Taller</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Costo Total</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Honor. Prof</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Total Arancel</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Actions</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Field name="cod">
                        {({ field }) => (
                          <Form.Field>
                            <Input
                              size="mini"
                              type="text"
                              {...field}
                              name="cod"
                            />
                            {errors.cod && touched.cod ? (
                              <div className="error-text">{errors.cod}</div>
                            ) : null}
                          </Form.Field>
                        )}
                      </Field>
                    </Table.Cell>
                    <Table.Cell>
                      <Field name="desc">
                        {({ field }) => (
                          <Form.Field>
                            <Input
                              size="mini"
                              type="text"
                              {...field}
                              name="desc"
                            />
                            {errors.desc && touched.desc ? (
                              <div className="error-text">{errors.desc}</div>
                            ) : null}
                          </Form.Field>
                        )}
                      </Field>
                    </Table.Cell>
                    <Table.Cell>
                      <Field name="costV">
                        {({ field }) => (
                          <Form.Field>
                            <Input
                              size="mini"
                              type="text"
                              {...field}
                              name="costV"
                            />
                            {errors.costV && touched.costV ? (
                              <div className="error-text">{errors.costV}</div>
                            ) : null}
                          </Form.Field>
                        )}
                      </Field>
                    </Table.Cell>
                    <Table.Cell>
                      <Field name="costF">
                        {({ field }) => (
                          <Form.Field>
                            <Input
                              size="mini"
                              type="text"
                              {...field}
                              name="costF"
                            />
                            {errors.costF && touched.costF ? (
                              <div className="error-text">{errors.costF}</div>
                            ) : null}
                          </Form.Field>
                        )}
                      </Field>
                    </Table.Cell>
                    <Table.Cell>
                      <Field name="costTa">
                        {({ field }) => (
                          <Form.Field>
                            <Input
                              size="mini"
                              type="text"
                              {...field}
                              name="costTa"
                            />
                            {errors.costTa && touched.costTa ? (
                              <div className="error-text">{errors.costTa}</div>
                            ) : null}
                          </Form.Field>
                        )}
                      </Field>
                    </Table.Cell>
                    <Table.Cell>
                      <Field name="costT">
                        {({ field }) => (
                          <Form.Field>
                            <Input
                              size="mini"
                              type="text"
                              {...field}
                              name="costT"
                            />
                            {errors.costT && touched.costT ? (
                              <div className="error-text">{errors.costT}</div>
                            ) : null}
                          </Form.Field>
                        )}
                      </Field>
                    </Table.Cell>
                    <Table.Cell>
                      <Field name="honP">
                        {({ field }) => (
                          <Form.Field>
                            <Input
                              size="mini"
                              type="text"
                              {...field}
                              name="honP"
                            />
                            {errors.honP && touched.honP ? (
                              <div className="error-text">{errors.honP}</div>
                            ) : null}
                          </Form.Field>
                        )}
                      </Field>
                    </Table.Cell>
                    <Table.Cell>
                      <Field name="tA">
                        {({ field }) => (
                          <Form.Field>
                            <Input
                              size="mini"
                              type="text"
                              {...field}
                              name="tA"
                            />
                            {errors.tA && touched.tA ? (
                              <div className="error-text">{errors.tA}</div>
                            ) : null}
                          </Form.Field>
                        )}
                      </Field>
                    </Table.Cell>
                    <Table.Cell>
                      {isEdit ? (
                        <Button
                          className="ui inverted blue button"
                          icon="pencil"
                          loading={isLoading}
                          type="submit"
                          circular
                        ></Button>
                      ) : (
                        <Button
                          className="ui inverted blue button"
                          icon="plus"
                          circular
                        ></Button>
                      )}
                    </Table.Cell>
                  </Table.Row>

                  {registros.map((registro, index) => {
                    return (
                      <Table.Row>
                        <Table.Cell>{registro.cod_id}</Table.Cell>
                        <Table.Cell>{registro.descripcion}</Table.Cell>
                        <Table.Cell>${registro.costo_variable}</Table.Cell>
                        <Table.Cell>${registro.costo_taller}</Table.Cell>
                        <Table.Cell>${registro.costo_total}</Table.Cell>
                        <Table.Cell>${registro.honorarioP}</Table.Cell>
                        <Table.Cell>${registro.total_arancel}</Table.Cell>
                      </Table.Row>
                    );
                  })}
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
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default DataTableFile;
