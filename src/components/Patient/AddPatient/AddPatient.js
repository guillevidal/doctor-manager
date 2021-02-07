import React, { useState, useRef } from "react";
import { Button, Icon, Input, Form } from "semantic-ui-react";
import { Formik, Field } from "formik";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { getEdad } from "../../../utils/utils";
import * as Yup from "yup";

import DatePicker, { registerLocale } from "react-datepicker";
import CompleteRecord from "../CompleteRecord";
import es from "date-fns/locale/es";

import firebase from "../../../utils/Firebase";

import "react-datepicker/dist/react-datepicker.css";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import "./AddPatient.scss";

registerLocale("es", es);

//Const global scope
const db = firebase.firestore(firebase);
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const AddPatient = (
  props,
  {
    name = "",
    surname = "",
    dni = "",
    birthdate = "",
    phone_number = "",
    location,
    job = "",
    medical_insurance = "",
    user_id = "",
    gp = "", //Medico de cabecera
    gp_phone = "",
    medical_treatment = "", //Recibe algun tratamiento medico? Cual?
    allergies = "", //Alergia a algun medicamento?
    tooth_info = "", //Cuando se lastima o extrae algun diente sangra y necesita atencion?
    affections = "", //..
    medicines = "", //Toma algun medicamento ¿cual?
    cigarettes = "", //Cuantos cigarrillos fuma?
    sex = "",
    pregnat = "",
  }
) => {
  const { setShowModal, setContentModal, user, history } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <Formik
      initialValues={{
        name,
        surname,
        dni,
        birthdate,
        phone_number,
        location,
        job,
        medical_insurance,
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(4, "Debe tener al menos 4 caracteres")
          .max(20, "Debe tener 20 caracteres o menos")
          .required("Debes completar este campo"),
        surname: Yup.string()
          .min(4, "Debe tener al menos 4 caracteres")
          .max(8, "Debe tener 8 caracteres o menos")
          .required("Debes completar este campo"),
        birthdate: Yup.date().required("Debes compltear este campo"),
        dni: Yup.string()
          .required("Debes completar este campo")
          .min(8, "Un dni tiene 8 caracteres")
          .max(8, "Un dni tiene 8 caracteres")
          .matches(phoneRegExp, "DNI no valido,introduzca solo numeros"),
        phone_number: Yup.string()
          .max(10, "máximo 10 caracteres")
          .matches(
            phoneRegExp,
            "Numero de teléfono no valido,introduzca solo numeros"
          ),
        medical_insurance: Yup.string()
          .required("En caso de que no tenga ponga SIN")
          .max(10, "Debe tener 10 caracteres o menos"),

        birthdate: Yup.date().required("Completa el campo"),
      })}
      onSubmit={async (values, { resetForm }) => {
        const {
          name,
          surname,
          birthdate,
          dni,
          medical_insurance,
          phone_number,
        } = values;
        const age = getEdad(birthdate);

        setIsLoading(true);

        const data = {
          user_id: user.uid,
          name: name,
          surname: surname,
          dni: dni,
          birthdate: birthdate,
          age: age,
          phone_number: phone_number,
          medical_insurance: medical_insurance,
        };
        await db
          .collection("pacientes")
          .doc(dni)
          .set(data)
          .then(() => {
            toast.success("Paciente guardado con exito");
            resetForm();
            setIsLoading(false);
            setShowModal(false);
          })
          .catch(() => {
            toast.warning("Error al crear el paciente.");
            setIsLoading(false);
          });
        console.log(data);
        // setShowModal(false);
      }}
    >
      {({ errors, touched, handleSubmit, handleChange, setFieldValue }) => {
        return (
          <div className="register-form">
            <Form onSubmit={handleSubmit} onChange={handleChange}>
              <h1>Agregar Paciente</h1>
              <div>
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

                <Field name="phone_number">
                  {({ field }) => (
                    <Form.Field>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Numero de teléfono o celular"
                        icon="phone"
                      />
                      {errors.phone_number && touched.phone_number ? (
                        <div className="error-text">{errors.phone_number}</div>
                      ) : null}
                    </Form.Field>
                  )}
                </Field>

                <Field name="medical_insurance">
                  {({ field }) => (
                    <Form.Field>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Obra social"
                        icon="pencil alternate"
                      />
                      {errors.medical_insurance && touched.medical_insurance ? (
                        <div className="error-text">
                          {errors.medical_insurance}
                        </div>
                      ) : null}
                    </Form.Field>
                  )}
                </Field>

                <Field name="birthdate">
                  {({ field }) => (
                    <Form.Field>
                      <Icon
                        name="calendar alternate"
                        size="large"
                        className="icon"
                        onClick={() => setOpen(!open)}
                      />
                      <DatePicker
                        {...field}
                        open={open}
                        readOnly
                        locale="es"
                        selected={
                          (field.value && new Date(field.value)) || null
                        }
                        popperModifiers
                        peekNextMonth
                        placeholderText="12/31/2000"
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                        onChange={(val) => {
                          setFieldValue(field.name, val);
                        }}
                      />

                      {errors.birthdate && touched.birthdate ? (
                        <div className="error-text">{errors.birthdate}</div>
                      ) : null}
                    </Form.Field>
                  )}
                </Field>
              </div>
              <div>
                <h1>Ficha Medica</h1>
              </div>

              <Button type="submit" loading={isLoading}>
                Enviar
              </Button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default withRouter(AddPatient);
