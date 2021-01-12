import React, { useState, useRef } from "react";
import { Button, Icon, Input, Form } from "semantic-ui-react";
import { Formik, Field } from "formik";
import { toast } from "react-toastify";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";

import * as Yup from "yup";

import firebase from "../../../utils/Firebase";
import "react-datepicker/dist/react-datepicker.css";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import "./AddPatient.scss";
import { date } from "yup/lib/locale";

registerLocale("es", es);

const db = firebase.firestore(firebase);

function getEdad(dateString) {
  let hoy = new Date();
  let fechaNacimiento = new Date(dateString);
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
  if (
    diferenciaMeses < 0 ||
    (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
  ) {
    edad--;
  }
  return edad;
}

const AddPatient = (
  props,
  {
    name = "",
    surname = "",
    dni = "",
    birthdate = "",
    phone_number,
    location,
    job,
    medical_insurance,
    user_id,
  }
) => {
  const { setShowModal } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false)
  const datePickerRef = useRef(null);

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
      // validationSchema={Yup.object({
      //   // username: Yup.string()
      //   //   .min(4, "Debe tener al menos 4 caracteres")
      //   //   .max(50, "Debe tener 50 caracteres o menos")
      //   //   .required("Debes completar este campo"),
      //   // email: Yup.string()
      //   //   .email("Introduzca un email valido por favor")
      //   //   .required("Debes completar este campo"),
      //   // // address: Yup.string()
      //   // //   .min(6, "Debe tener al menos 4 caracteres")
      //   // //   .max(50, "Debe tener 50 caracteres o menos")
      //   // //   .required("Debes completar este campo"),
      //   // // phoneNumber: Yup.string()
      //   // //   .required("Please Enter your Phone Number")
      //   // //   .matches(
      //   // //     /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      //   // //     "Phone number is not valid"
      //   // //   ),
      //   // password: Yup.string()
      //   //   .required("Please Enter your password")
      //   //   .matches(
      //   //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      //   //     "Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un numero y un carácter especial"
      //   //   ),
      //   // passwordConfirmation: Yup.string()
      //   //   .oneOf([Yup.ref("password"), null], "La contraseña no coincide")
      //   //   .required("Password confirm is required"),
      // })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const { birthdate } = values;
        console.log(getEdad(birthdate));
        setIsLoading(true);
        console.log(values);
        const data = {
          user_id: "",
          name: "",
          surname: "",
          dni: "",
          birthdate: "",
          age: "",
          phone_number: "",
          location: "",
          job: "",
          medical_insurance: "",
        };
        // setShowModal(false);
      }}
    >
      {({ errors, touched, handleSubmit, handleChange, setFieldValue }) => {
        return (
          <div className="register-form">
            <h1>Agregar Paciente</h1>
            <Form onSubmit={handleSubmit} onChange={handleChange}>
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
                      <div className="error-text">{errors.email}</div>
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
                    {errors.name && touched.name ? (
                      <div className="error-text">{errors.email}</div>
                    ) : null}
                  </Form.Field>
                )}
              </Field>

              <Field name="birthdate">
                {({ field }) => (
                  <Form.Field>
                    <DatePicker
                      {...field}
                      open={open}
                      locale="es"
                      selected={(field.value && new Date(field.value)) || null}
                      peekNextMonth
                      onClickOutside={()=>setOpen(false)}
                      placeholderText="12/31/2000"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="scroll"
                      onChange={(val) => {
                        setFieldValue(field.name, val);
                      }}
                    />
                    <Icon
                      name="calendar alternate"
                      size="large"
                      className="icon"
                      onClick={() => setOpen(true)}
                    />
                  </Form.Field>
                )}
              </Field>

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

export default AddPatient;
