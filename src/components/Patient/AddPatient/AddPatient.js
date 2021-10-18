import React, { useState } from "react"
import {
  Button,
  Input,
  Form,
  Grid,
  Checkbox,
  Dropdown,
  Divider,
} from "semantic-ui-react"
import { Formik, Field } from "formik"
import * as Yup from "yup"
import { toast } from "react-toastify"
import { withRouter } from "react-router-dom"
import DatePicker from "react-modern-calendar-datepicker"
//
import { options, phoneRegExp } from "./variables"
import firebase from "../../../utils/Firebase"
//
//
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
//
import "react-modern-calendar-datepicker/lib/DatePicker.css"
import "./AddPatient.scss"

// Const global scope
const db = firebase.firestore(firebase)

const AddPatient = (
  props,
  {
    name = "",
    surname = "",
    dni = "",
    birthdate = "",
    phone_number = "",
    address = "",
    job = "",
    health_insurance = "",
    health_insurance_cod = "",
    general_practitioner = "", // Medico de cabecera
    general_practitioner_phone = "",
    medical_treatment = "", // Recibe algun tratamiento medico? Cual?
    allergies = "", // Alergia a algun medicamento?
    tooth_info = "", // Cuando se lastima o extrae algun diente sangra y necesita atencion?
    medicines = "", // Toma algun medicamento ¿cual?
    cigarettes = "", // Cuantos cigarrillos fuma?
    sex = "",
    pregnat = "",
  }
) => {
  // Vars
  const { setShowModal, user } = props
  let affectionsArr = []
  // Estados
  const [isLoading, setIsLoading] = useState(false)
  const [openCheck, setOpenCheck] = useState(false)
  const [openCheckA, setOpenCheckA] = useState(false)
  const [openCheckTooth, setOpenCheckTooth] = useState(false)
  const [selectedDay, setSelectedDay] = useState(null)
  // Handlers
  const handleChangeDropdown = (e, { value }) => {
    affectionsArr = []
    affectionsArr = value
  }
  const formatInputValue = () => {
    if (!selectedDay) return ""
    return `${selectedDay.day}/${selectedDay.month}/${selectedDay.year}`
  }

  return (
    <Formik
      initialValues={{
        name,
        surname,
        dni,
        birthdate,
        phone_number,
        address,
        job,
        health_insurance,
        health_insurance_cod,
        general_practitioner,
        general_practitioner_phone,
        medical_treatment,
        allergies,
        tooth_info,
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(4, "Debe tener al menos 4 caracteres")
          .max(15, "Debe tener 15 caracteres o menos")
          .required("Debes completar este campo"),
        surname: Yup.string()
          .min(4, "Debe tener al menos 4 caracteres")
          .max(15, "Debe tener 15 caracteres o menos")
          .required("Debes completar este campo"),
        dni: Yup.string()
          .required("Debes completar este campo")
          .min(7, "Un dni tiene al menos 7 caracteres")
          .max(8, "Un dni tiene hasta 8 caracteres")
          .matches(phoneRegExp, "DNI no valido,introduzca solo numeros"),
        phone_number: Yup.string()
          .min(10, "Los numeros tienen como minimo 10 caracteres")
          .max(10, "máximo 10 caracteres")
          .matches(
            phoneRegExp,
            "Numero de teléfono no valido,introduzca solo numeros"
          ),
        address: Yup.string().max(20, "Debe tener menos de 20 caracteres"),
        health_insurance: Yup.string().max(
          15,
          "Debe tener 15 caracteres o menos"
        ),
        health_insurance_cod: Yup.string().max(
          15,
          "Debe tener 15 caracteres o menos"
        ),
        general_practitioner: Yup.string()
          .min(4, "Debe tener al menos 4 caracteres")
          .max(20, "Debe tener 20 caracteres o menos")
          .required("Debes completar este campo"),
        general_practitioner_phone: Yup.string()
          .min(10, "Los numeros tienen como minimo 10 caracteres")
          .max(10, "máximo 10 caracteres")
          .matches(
            phoneRegExp,
            "Numero de teléfono no valido,introduzca solo numeros"
          ),
        medical_treatment: Yup.string()
          .min(4, "Debe tener al menos 4 caracteres")
          .max(40, "Debe tener 40 caracteres o menos"),
        allergies: Yup.string()
          .min(4, "Debe tener al menos 4 caracteres")
          .max(30, "Debe tener 30 caracteres o menos"),
      })}
      onSubmit={async (values, { resetForm }) => {
        const {
          name,
          surname,
          birthdate,
          dni,
          address,
          phone_number,
          general_practitioner,
          general_practitioner_phone,
          medical_treatment,
          allergies,
          health_insurance,
          health_insurance_cod,
        } = values

        const nativeBirthdate = new Date(
          birthdate.year,
          birthdate.month - 1,
          birthdate.day
        )
        if (openCheckTooth) {
          values.tooth_info = "Si"
        } else {
          values.tooth_info = "No"
        }

        setIsLoading(true)

        const data = {
          user_id: user.uid,
          info_personal: {
            name: name,
            surname: surname,
            dni: dni,
            birthdate: nativeBirthdate,
            address: address,
            phone_number: phone_number,
          },
          medical_record: {
            general_practitioner: general_practitioner,
            general_practitioner_phone: general_practitioner_phone,
            medical_treatment: medical_treatment,
            allergies: allergies,
            affections: affectionsArr,
            tooth_info: values.tooth_info,
          },
          health_insurance: {
            health_insurance: health_insurance,
            health_insurance_cod: health_insurance_cod,
          },
        }
        await db
          .collection("pacientes")
          .doc(dni)
          .set(data)
          .then(() => {
            toast.success("Paciente guardado con exito")
            resetForm()
            setIsLoading(false)
            setShowModal(false)
          })
          .catch(() => {
            toast.warning("Error al crear el paciente.")
            setIsLoading(false)
          })

        setShowModal(false)
      }}
    >
      {({ errors, touched, handleSubmit, handleChange, setFieldValue }) => {
        return (
          <div className="register-form">
            <Form onSubmit={handleSubmit} onChange={handleChange}>
              <Grid>
                {/* --- */}
                <Grid.Row columns={1}>
                  <Grid.Column>
                    <h1>Agregar Paciente</h1>
                  </Grid.Column>
                </Grid.Row>
                {/* --- */}
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <h1>Información del Paciente</h1>
                    {/* --- */}
                    <Field name="name">
                      {({ field }) => (
                        <Form.Field>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Nombre"
                            icon="user circle"
                          />
                          {errors.name && touched.name ? (
                            <div className="error-text">{errors.name}</div>
                          ) : null}
                        </Form.Field>
                      )}
                    </Field>
                    {/* --- */}
                    <Field name="surname">
                      {({ field }) => (
                        <Form.Field>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Apellido"
                            icon="user circle"
                          />
                          {errors.surname && touched.surname ? (
                            <div className="error-text">{errors.surname}</div>
                          ) : null}
                        </Form.Field>
                      )}
                    </Field>
                    {/* --- */}
                    <Field name="dni">
                      {({ field }) => (
                        <Form.Field>
                          <Input
                            type="text"
                            {...field}
                            placeholder="DNI"
                            icon="user circle"
                          />
                          {errors.dni && touched.dni ? (
                            <div className="error-text">{errors.dni}</div>
                          ) : null}
                        </Form.Field>
                      )}
                    </Field>
                    {/* --- */}
                    <Field name="phone_number">
                      {({ field }) => (
                        <Form.Field>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Numero de teléfono o celular"
                            icon="phone"
                            maxLength="10"
                          />
                          {errors.phone_number && touched.phone_number ? (
                            <div className="error-text">
                              {errors.phone_number}
                            </div>
                          ) : null}
                        </Form.Field>
                      )}
                    </Field>
                    {/* --- */}
                    <Field name="address">
                      {({ field }) => (
                        <Form.Field>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Domicilio"
                            icon="clipboard"
                          />
                          {errors.address && touched.address ? (
                            <div className="error-text">{errors.address}</div>
                          ) : null}
                        </Form.Field>
                      )}
                    </Field>
                    {/* --- */}
                    <Field name="birthdate">
                      {({ field }) => (
                        <Form.Field>
                          <DatePicker
                            {...field}
                            value={selectedDay}
                            formatInputText={formatInputValue}
                            onChange={(value) => {
                              setSelectedDay(value)
                              setFieldValue(field.name, value)
                            }}
                            inputPlaceholder="Fecha de nacimiento"
                            shouldHighlightWeekends
                          />

                          {errors.birthdate && touched.birthdate ? (
                            <div className="error-text">{errors.birthdate}</div>
                          ) : null}
                        </Form.Field>
                      )}
                    </Field>
                    {/* --- */}
                  </Grid.Column>
                  {/* --- */}
                  <Grid.Column>
                    <h1>Ficha Medica</h1>
                    <Field name="general_practitioner">
                      {({ field }) => (
                        <Form.Field>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Nombre completo de medico de cabecera"
                            icon="user circle"
                          />
                          {errors.general_practitioner &&
                          touched.general_practitioner ? (
                            <div className="error-text">
                              {errors.general_practitioner}
                            </div>
                          ) : null}
                        </Form.Field>
                      )}
                    </Field>
                    {/* --- */}
                    <Field name="general_practitioner_phone">
                      {({ field }) => (
                        <Form.Field>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Numero de teléfono o celular medico de cabecera"
                            icon="phone"
                            maxLength="10"
                          />
                          {errors.general_practitioner_phone &&
                          touched.general_practitioner_phone ? (
                            <div className="error-text">
                              {errors.general_practitioner_phone}
                            </div>
                          ) : null}
                        </Form.Field>
                      )}
                    </Field>
                    {/* --- */}
                    <Checkbox
                      label="¿Recibe tratamiento medico?"
                      onChange={() => setOpenCheck(!openCheck)}
                    />
                    {openCheck && (
                      <Field name="medical_treatment">
                        {({ field }) => (
                          <Form.Field>
                            <Input
                              type="text"
                              {...field}
                              placeholder="¿Que tratamiento medico recibe?"
                              icon="clipboard"
                            />
                            {errors.medical_treatment &&
                            touched.medical_treatment ? (
                              <div className="error-text">
                                {errors.medical_treatment}
                              </div>
                            ) : null}
                          </Form.Field>
                        )}
                      </Field>
                    )}
                    {/* --- */}
                    <Checkbox
                      label="¿Tiene alergia a medicamentos?"
                      onChange={() => setOpenCheckA(!openCheckA)}
                    />
                    {openCheckA && (
                      <Field name="allergies">
                        {({ field }) => (
                          <Form.Field>
                            <Input
                              type="text"
                              {...field}
                              placeholder="¿Cuales?"
                              icon="clipboard"
                            />
                            {errors.allergies && touched.allergies ? (
                              <div className="error-text">
                                {errors.allergies}
                              </div>
                            ) : null}
                          </Form.Field>
                        )}
                      </Field>
                    )}
                    {/* --- */}
                    <Checkbox
                      label="¿Los dientes le sangran excesivamente al lastimarse o salirse?"
                      onChange={() => setOpenCheckTooth(!openCheckTooth)}
                    />
                    {/* --- */}
                    <Dropdown
                      placeholder="Afecciones"
                      fluid
                      multiple
                      selection
                      options={options}
                      onChange={handleChangeDropdown.bind(this)}
                    />
                    {/* --- */}
                  </Grid.Column>
                </Grid.Row>
                <Divider></Divider>
                <Grid.Row columns={1}>
                  <Grid.Column>
                    <h1>Seguro Medico</h1>
                    <Field name="health_insurance">
                      {({ field }) => (
                        <Form.Field>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Seguro medico"
                            icon="phone"
                            maxLength="10"
                          />
                          {errors.health_insurance &&
                          touched.health_insurance ? (
                            <div className="error-text">
                              {errors.health_insurance}
                            </div>
                          ) : null}
                        </Form.Field>
                      )}
                    </Field>
                    <Field name="health_insurance_cod">
                      {({ field }) => (
                        <Form.Field>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Codigo de seguro medico"
                            icon="phone"
                            maxLength="10"
                          />
                          {errors.health_insurance_cod &&
                          touched.health_insurance_cod ? (
                            <div className="error-text">
                              {errors.health_insurance_cod}
                            </div>
                          ) : null}
                        </Form.Field>
                      )}
                    </Field>
                  </Grid.Column>
                </Grid.Row>
                <Divider></Divider>

                {/* --- */}
                <Grid.Row columns={1}>
                  <Grid.Column>
                    <Button type="submit" loading={isLoading}>
                      Enviar
                    </Button>
                  </Grid.Column>
                </Grid.Row>
                {/* --- */}
              </Grid>
            </Form>
          </div>
        )
      }}
    </Formik>
  )
}

export default withRouter(AddPatient)
