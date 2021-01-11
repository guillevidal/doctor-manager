import React, { useState } from "react";
import { Button, Icon, Input, Form } from "semantic-ui-react";
import { Formik, Field } from "formik";
import { toast } from "react-toastify";

import * as Yup from "yup";

import firebase from "../../../utils/Firebase";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import "./AddPatient.scss";

const db = firebase.firestore(firebase);

const AddPatient = (
  props,
  {  name = "", dni = "", age = null,birthdate = "",phone_number,location,job,medical_insurance,user_id }
) => {

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Formik
      initialValues={{
        name,
        dni,
        age,
        birthdate,
        phone_number,
        location,
        job,
        medical_insurance
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
        
      }}
    >
      {({
        errors,
        touched,
        handleSubmit,
        handleChange,
      }) => {
        return (
          <div className="register-form">
            <h1>Agregar Paciente</h1>
            <Form onSubmit={handleSubmit} onChange={handleChange}>

              <Field name="email">
                {({ field }) => (
                  <Form.Field>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Correo electrónico"
                      icon="mail outline"
                    />
                    {errors.email && touched.email ? (
                      <div className="error-text">{errors.email}</div>
                    ) : null}
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
