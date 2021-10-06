import React, { useState, useEffect } from "react"
import { Menu, Table, Form, Button, Input, Dropdown } from "semantic-ui-react"
import { confirmAlert } from "react-confirm-alert"
import { Formik, Field } from "formik"
import * as Yup from "yup"
import { map } from "lodash"
import { toast } from "react-toastify"

import firebase from "../../utils/Firebase"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
import "./DataTableFile.scss"

const db = firebase.firestore(firebase)
const options = [
  { key: "consultas", text: "CONSULTAS", value: "CONSULTAS" },
  { key: "operatoria", text: "OPERATORIA", value: "OPERATORIA" },
  { key: "endodoncia", text: "ENDODONCIA", value: "ENDODONCIA" },
  { key: "protesis", text: "PROTESIS", value: "PROTESIS" },
]

const DataTableFile = (
  props,
  {
    codigoFormik = "",
    descripcionFormik = "",
    costoVariableFormik = "",
    costoFijoFormik = "",
    costoTallerFormik = "",
    costoTotalFormik = "",
    honorarioProfFormik = "",
    totalArancelFormik = "",
  }
) => {
  const { user } = props
  const [isEdit, setEdit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [render, setRender] = useState(false)
  const [registros, setRegistros] = useState([])
  const [page, setPage] = useState(1)
  const [type, setType] = useState("")

  useEffect(() => {
    const getData = async () => {
      await db
        .collection("registros")
        .orderBy("cod_id", "desc")
        .limit(4)
        .get()
        .then((response) => {
          const arrayRegistros = []
          if (response.length !== 0) {
            map(response.docs, (registro) => {
              const data = registro.data()
              data.id = registro.id
              arrayRegistros.push(data)
            })
          }

          setPage(1)
          setRegistros(arrayRegistros)
        })
    }
    getData()
  }, [user, render])
  const handleNext = async () => {
    const ultimo = registros.length - 1
    await db
      .collection("registros")
      .orderBy("cod_id", "desc")
      .startAfter(registros[ultimo].cod_id)
      .limit(4)
      .get()
      .then(async (response) => {
        const arrayRegistros = []
        if (response.length !== 0) {
          map(response.docs, (registro) => {
            const data = registro.data()
            data.id = registro.id
            arrayRegistros.push(data)
          })
        }

        await setRegistros(arrayRegistros)
        setPage(page + 1)
      })
  }

  const handleBack = async () => {
    const primero = 0
    if (page !== 1) {
      await db
        .collection("registros")
        .orderBy("cod_id", "asc")
        .startAfter(registros[primero].cod_id)
        .limit(4)
        .get()
        .then(async (response) => {
          const arrayRegistros = []
          if (response.length !== 0) {
            map(response.docs, (registro) => {
              const data = registro.data()
              data.id = registro.id
              arrayRegistros.push(data)
            })
          }

          arrayRegistros.reverse()
          setPage(page - 1)
          await setRegistros(arrayRegistros)
        })
    }
  }
  const handleChangeDropdown = (e, { value }) => {
    setType(value)
  }
  /**
   * Este metodo se encarga de llamar a la base de datos un registro para editarlo con los datos que se le pasen por parametero
   * @param {object} registro
   * @param {function} setFieldValue
   */
  const handleEditRegisterChange = (registro, setFieldValue) => {
    const {
      cod_id,
      descripcion,
      costo_variable,
      costo_fijo,
      costo_taller,
      costo_total,
      honorarioP,
      total_arancel,
    } = registro
    setFieldValue("codigoFormik", cod_id)
    setFieldValue("descripcionFormik", descripcion)
    setFieldValue("costoVariableFormik", costo_variable)
    setFieldValue("costoFijoFormik", costo_fijo)
    setFieldValue("costoTallerFormik", costo_taller)
    setFieldValue("costoTotalFormik", costo_total)
    setFieldValue("honorarioProfFormik", honorarioP)
    setFieldValue("totalArancelFormik", total_arancel)
    setEdit(true)
  }

  /**
   * Primera-mente habre una ventana de confirmación
   * este metodo se encarga de llamar a la base de datos para borar un registro a partir de la id de un documento existente que se le
   * pase por parametro
   * @param {object} registro
   */
  const handleButtonClickDelete = async (registro) => {
    setIsLoading(true)
    confirmAlert({
      title: "Confirme para eliminar",
      message: "¿Esta seguro de eliminar el registro?.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await db
              .collection("registros")
              .doc(registro.cod_id)
              .delete()
              .then(function () {
                toast.success("Registro Eliminado con exito")
                setIsLoading(false)
                setRender(!render)
              })
              .catch(function () {
                toast.warning("Error al eliminar el registro.")
              })
          },
        },
        {
          label: "No",
          onClick: () => setIsLoading(false),
        },
      ],
    })
  }

  return (
    <Formik
      initialValues={{
        codigoFormik,
        descripcionFormik,
        costoVariableFormik,
        costoFijoFormik,
        costoTallerFormik,
        costoTotalFormik,
        honorarioProfFormik,
        totalArancelFormik,
      }}
      validationSchema={Yup.object({
        codigoFormik: Yup.number()
          .typeError("Por favor ingrese un numero valido Ej: 10.20")
          .test("maxDigitsAfterDecimal", (number) =>
            /^\d+(\.\d{1,2})?$/.test(number)
          )
          .required("Debe completar este campo"),
        descripcionFormik: Yup.string()
          .max(120, "Maximo 120 caracteres")
          .required("Debe completar este campo"),

        costoVariableFormik: Yup.number()
          .typeError("Por favor ingrese un numero valido Ej: 10.20")
          .test("maxDigitsAfterDecimal", (number) =>
            /^\d+(\.\d{1,2})?$/.test(number)
          )
          .required("Debe completar este campo"),
        costoFijoFormik: Yup.number()
          .typeError("Por favor ingrese un numero valido Ej: 10.20")
          .test("maxDigitsAfterDecimal", (number) =>
            /^\d+(\.\d{1,2})?$/.test(number)
          )
          .required("Debe completar este campo"),
        costoTallerFormik: Yup.number()
          .typeError("Por favor ingrese un numero valido Ej: 10.20")
          .test("maxDigitsAfterDecimal", (number) =>
            /^\d+(\.\d{1,2})?$/.test(number)
          )
          .required("Debe completar este campo"),
        costoTotalFormik: Yup.number()
          .typeError("Por favor ingrese un numero valido Ej: 10.20")
          .test("maxDigitsAfterDecimal", (number) =>
            /^\d+(\.\d{1,2})?$/.test(number)
          )
          .required("Debe completar este campo"),
        honorarioProfFormik: Yup.number()
          .typeError("Por favor ingrese un numero valido Ej: 10.20")
          .test("maxDigitsAfterDecimal", (number) =>
            /^\d+(\.\d{1,2})?$/.test(number)
          )
          .required("Debe completar este campo"),
        totalArancelFormik: Yup.number()
          .typeError("Por favor ingrese un numero valido Ej: 10.20")
          .test("maxDigitsAfterDecimal", (number) =>
            /^\d+(\.\d{1,2})?$/.test(number)
          )
          .required("Debe completar este campo"),
      })}
      onSubmit={async (values, { resetForm }) => {
        setIsLoading(true)

        const {
          codigoFormik,
          descripcionFormik,
          costoVariableFormik,
          costoFijoFormik,
          costoTallerFormik,
          costoTotalFormik,
          honorarioProfFormik,
          totalArancelFormik,
        } = values

        const data = {
          type: type,
          cod_id: codigoFormik,
          descripcion: descripcionFormik,
          costo_variable: costoVariableFormik,
          costo_fijo: costoFijoFormik,
          costo_taller: costoTallerFormik,
          costo_total: costoTotalFormik,
          honorarioP: honorarioProfFormik,
          total_arancel: totalArancelFormik,
        }

        if (isEdit === true) {
          await db
            .collection("registros")
            .doc(codigoFormik)
            .update(data)
            .then(() => {
              toast.success("Registro editado con exito")
              resetForm()
              setIsLoading(false)
              setRender(!render)
              setEdit(false)
            })
            .catch((error) => {
              toast.warning("Error al crear el registro")
              setIsLoading(false)
            })
        } else {
          await db
            .collection("registros")
            .doc(codigoFormik)
            .set(data)
            .then(() => {
              toast.success("Registro guardado con exito")
              resetForm()
              setIsLoading(false)
              setRender(!render)
            })
            .catch((error) => {
              toast.warning("Error al crear el registro")
              setIsLoading(false)
            })
        }
      }}
    >
      {({
        errors,
        touched,
        handleSubmit,
        handleChange,
        setFieldValue,
        resetForm,
      }) => {
        return (
          <div className="file-form">
            <Form onSubmit={handleSubmit} onChange={handleChange}>
              <Table celled size="small">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width={2}>Sección</Table.HeaderCell>
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
                    <Table.HeaderCell width={6}>Actions</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Dropdown
                        placeholder="Sección"
                        search
                        selection
                        options={options}
                        onChange={handleChangeDropdown.bind(this)}
                      />
                      {errors.typeFormik && touched.typeFormik ? (
                        <div className="error-text">{errors.typeFormik}</div>
                      ) : null}
                    </Table.Cell>
                    <Table.Cell>
                      <Field name="codigoFormik">
                        {({ field }) => (
                          <Form.Field>
                            <Input
                              size="mini"
                              type="text"
                              {...field}
                              name="codigoFormik"
                              value={field.value}
                              disabled={isEdit === true}
                              onChange={() =>
                                setFieldValue("codigoFormik", field.value)
                              }
                            />
                            {errors.codigoFormik && touched.codigoFormik ? (
                              <div className="error-text">
                                {errors.codigoFormik}
                              </div>
                            ) : null}
                          </Form.Field>
                        )}
                      </Field>
                    </Table.Cell>
                    <Table.Cell>
                      <Field name="descripcionFormik">
                        {({ field }) => (
                          <Form.Field>
                            <Input
                              size="mini"
                              type="text"
                              {...field}
                              name="descripcionFormik"
                              value={field.value}
                              onChange={() =>
                                setFieldValue("descripcion", field.value)
                              }
                            />
                            {errors.descripcionFormik &&
                            touched.descripcionFormik ? (
                              <div className="error-text">
                                {errors.descripcionFormik}
                              </div>
                            ) : null}
                          </Form.Field>
                        )}
                      </Field>
                    </Table.Cell>
                    <Table.Cell>
                      <Field name="costoVariableFormik">
                        {({ field }) => (
                          <Form.Field>
                            <Input
                              size="mini"
                              type="text"
                              {...field}
                              name="costoVariableFormik"
                              value={field.value}
                              onChange={() =>
                                setFieldValue("costoVariable", field.value)
                              }
                            />
                            {errors.costoVariableFormik &&
                            touched.costoVariableFormik ? (
                              <div className="error-text">
                                {errors.costoVariableFormik}
                              </div>
                            ) : null}
                          </Form.Field>
                        )}
                      </Field>
                    </Table.Cell>
                    <Table.Cell>
                      <Field name="costoFijoFormik">
                        {({ field }) => (
                          <Form.Field>
                            <Input
                              size="mini"
                              type="text"
                              {...field}
                              name="costoFijoFormik"
                              value={field.value}
                              onChange={() =>
                                setFieldValue("costoFijoFormik", field.value)
                              }
                            />
                            {errors.costoFijoFormik &&
                            touched.costoFijoFormik ? (
                              <div className="error-text">
                                {errors.costoFijoFormik}
                              </div>
                            ) : null}
                          </Form.Field>
                        )}
                      </Field>
                    </Table.Cell>
                    <Table.Cell>
                      <Field name="costoTallerFormik">
                        {({ field }) => (
                          <Form.Field>
                            <Input
                              size="mini"
                              type="text"
                              {...field}
                              name="costoTallerFormik"
                              value={field.value}
                              onChange={() =>
                                setFieldValue("costoTallerFormik", field.value)
                              }
                            />
                            {errors.costoTallerFormik &&
                            touched.costoTallerFormik ? (
                              <div className="error-text">
                                {errors.costoTallerFormik}
                              </div>
                            ) : null}
                          </Form.Field>
                        )}
                      </Field>
                    </Table.Cell>
                    <Table.Cell>
                      <Field name="costoTotalFormik">
                        {({ field }) => (
                          <Form.Field>
                            <Input
                              size="mini"
                              type="text"
                              {...field}
                              name="costoTotalFormik"
                              value={field.value}
                              onChange={() =>
                                setFieldValue("costoTotalFormik", field.value)
                              }
                            />
                            {errors.costoTotalFormik &&
                            touched.costoTotalFormik ? (
                              <div className="error-text">
                                {errors.costoTotalFormik}
                              </div>
                            ) : null}
                          </Form.Field>
                        )}
                      </Field>
                    </Table.Cell>
                    <Table.Cell>
                      <Field name="honorarioProfFormik">
                        {({ field }) => (
                          <Form.Field>
                            <Input
                              size="mini"
                              type="text"
                              {...field}
                              name="honorarioProfFormik"
                              value={field.value}
                              onChange={() =>
                                setFieldValue(
                                  "honorarioProfFormik",
                                  field.value
                                )
                              }
                            />
                            {errors.honorarioProfFormik &&
                            touched.honorarioProfFormik ? (
                              <div className="error-text">
                                {errors.honorarioProfFormik}
                              </div>
                            ) : null}
                          </Form.Field>
                        )}
                      </Field>
                    </Table.Cell>
                    <Table.Cell>
                      <Field name="totalArancelFormik">
                        {({ field }) => (
                          <Form.Field>
                            <Input
                              size="mini"
                              type="text"
                              {...field}
                              name="totalArancelFormik"
                              value={field.value}
                              onChange={() =>
                                setFieldValue("totalArancelFormik", field.value)
                              }
                            />
                            {errors.totalArancelFormik &&
                            touched.totalArancelFormik ? (
                              <div className="error-text">
                                {errors.totalArancelFormik}
                              </div>
                            ) : null}
                          </Form.Field>
                        )}
                      </Field>
                    </Table.Cell>
                    <Table.Cell>
                      {isEdit ? (
                        <>
                          <Button
                            className="ui blue button"
                            icon="check"
                            loading={isLoading}
                            type="submit"
                            circular
                          ></Button>
                          <Button
                            className="ui red button"
                            icon="ban"
                            loading={isLoading}
                            onClick={() => {
                              setEdit(false)
                              resetForm()
                            }}
                            type="button"
                            circular
                          ></Button>
                        </>
                      ) : (
                        <Button
                          className="ui inverted blue button"
                          icon="plus"
                          type="submit"
                          circular
                        ></Button>
                      )}
                    </Table.Cell>
                  </Table.Row>

                  {registros.map((registro, index) => {
                    return (
                      <Table.Row key={registro.cod_id}>
                        <Table.Cell>{registro.type}</Table.Cell>
                        <Table.Cell>{registro.cod_id}</Table.Cell>
                        <Table.Cell>{registro.descripcion}</Table.Cell>
                        <Table.Cell>{registro.costo_variable}</Table.Cell>
                        <Table.Cell>{registro.costo_fijo}</Table.Cell>
                        <Table.Cell>{registro.costo_taller}</Table.Cell>
                        <Table.Cell>{registro.costo_total}</Table.Cell>
                        <Table.Cell>{registro.honorarioP}</Table.Cell>
                        <Table.Cell>{registro.total_arancel}</Table.Cell>
                        <Table.Cell>
                          <Button
                            className="ui inverted blue button"
                            icon="pencil"
                            loading={isLoading}
                            onClick={() =>
                              handleEditRegisterChange(registro, setFieldValue)
                            }
                            type="button"
                            circular
                          ></Button>

                          <Button
                            className="ui inverted red button"
                            icon="trash"
                            loading={isLoading}
                            onClick={() => handleButtonClickDelete(registro)}
                            type="button"
                            circular
                          ></Button>
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>

                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan="10">
                      <Menu floated="right" pagination>
                        <Menu.Item as="a" icon>
                          <Button
                            className="ui black button"
                            icon="chevron left"
                            type="button"
                            disabled={page === 1}
                            onClick={() => handleBack()}
                          ></Button>
                        </Menu.Item>

                        <Menu.Item as="a" icon>
                          <Button
                            className="ui black button"
                            icon="chevron right"
                            type="button"
                            disabled={registros.length < 4}
                            onClick={() => handleNext()}
                          ></Button>
                        </Menu.Item>
                      </Menu>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            </Form>
          </div>
        )
      }}
    </Formik>
  )
}

export default DataTableFile
