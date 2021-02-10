import React, { useState } from "react";
import { Button, Icon, Input, Form } from "semantic-ui-react";
import { Formik, Field } from "formik";
import { toast } from "react-toastify";

import * as Yup from "yup";

import firebase from "../../../utils/Firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import "./RegisterForm.scss";

const db = firebase.firestore(firebase);

const FormUser = (
  props,
  { uid, email = "", username = "", password = "", passwordConfirmation = "" }
) => {
  const {setShowModal} = props; 
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const changeUserName = (values) => {
    firebase
      .auth()
      .currentUser.updateProfile({
        displayName: values.username,
      })
      .catch(() => {
        toast.error("Error al asignar el nombre de usuario.");
      });
  };

  const sendVerificationEmail = () => {
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        toast.success("Se ha enviado un email de verificacion.");
      })
      .catch(() => {
        toast.error("Error al enviar el email de verificacion.");
      });
  };

  return (
    <Formik
      initialValues={{
        email,
        username,
        password,
        passwordConfirmation,
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .min(4, "Debe tener al menos 4 caracteres")
          .max(50, "Debe tener 50 caracteres o menos")
          .required("Debes completar este campo"),
        email: Yup.string()
          .email("Introduzca un email valido por favor")
          .required("Debes completar este campo"),
        // address: Yup.string()
        //   .min(6, "Debe tener al menos 4 caracteres")
        //   .max(50, "Debe tener 50 caracteres o menos")
        //   .required("Debes completar este campo"),
        // phoneNumber: Yup.string()
        //   .required("Please Enter your Phone Number")
        //   .matches(
        //     /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        //     "Phone number is not valid"
        //   ),
        password: Yup.string()
          .required("Please Enter your password")
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un numero y un carácter especial"
          ),
        passwordConfirmation: Yup.string()
          .oneOf([Yup.ref("password"), null], "La contraseña no coincide")
          .required("Password confirm is required"),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setIsLoading(true);
        firebase
          .auth()
          .createUserWithEmailAndPassword(values.email, values.password)
          .then((response) => {
            changeUserName(values);
            sendVerificationEmail();
            setShowModal(false);
            const data = {
              uid: response.user.uid,
              username:values.username,
              email: values.email,
              pacientes:[]
            };
            setTimeout(() => {
              db.collection("users")
                .doc(response.user.uid)
                .set(data)
                .then(() => console.log("ok"));
            }, 3000);
          })
          .catch(() => {
            toast.error("Error al crear la cuenta.");
          })
          .finally(() => {
            setIsLoading(false);
          });
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
            <h1>Registrar usuario</h1>
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

              <Field name="password">
                {({ field}) => (
                  <Form.Field>
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                      placeholder="Contraseña"
                      icon={
                        showPassword ? (
                          <Icon
                            name="eye slash outline"
                            link
                            onClick={handlerShowPassword}
                          />
                        ) : (
                          <Icon name="eye" link onClick={handlerShowPassword} />
                        )
                      }
                    />
                    {errors.password && touched.password ? (
                      <div className="error-text">{errors.password}</div>
                    ) : null}
                  </Form.Field>
                )}
              </Field>

              <Field name="passwordConfirmation">
                {({ field }) => (
                  <Form.Field>
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                      placeholder="Contraseña"
                      icon={
                        showPassword ? (
                          <Icon
                            name="eye slash outline"
                            link
                            onClick={handlerShowPassword}
                          />
                        ) : (
                          <Icon name="eye" link onClick={handlerShowPassword} />
                        )
                      }
                    />
                    {errors.passwordConfirmation &&
                    touched.passwordConfirmation ? (
                      <div className="error-text">{errors.passwordConfirmation}</div>
                    ) : null}
                  </Form.Field>
                )}
              </Field>

              <Field name="username" className="field">
                {({ field }) => (
                  <Form.Field>
                    <Input
                      type="text"
                      {...field}
                      placeholder="¿Como deberíamos llamarte?"
                      icon="user circle outline"
                    />
                    {errors.username && touched.username ? (
                      <div className="error-text">{errors.username}</div>
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

export default FormUser;
