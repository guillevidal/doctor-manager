import React, { useState } from "react";
import {
  Button,
  Icon,
  Input,
  Form,
  Grid,
  Checkbox,
  Dropdown,
} from "semantic-ui-react";
//
import { Formik, Field } from "formik";
import * as Yup from "yup";
//
import { toast } from "react-toastify";
//
import { withRouter } from "react-router-dom";
//
import { getEdad } from "../../../utils/utils";
//
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
//
import firebase from "../../../utils/Firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
//
import "react-datepicker/dist/react-datepicker.css";
//
import "./AddPatient.scss";
//
registerLocale("es", es);

//Const global scope
const db = firebase.firestore(firebase);
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const options = [
  { key: "pc", text: "Problemas cardiacos", value: "Problemas cardiacos" },
  { key: "hep", text: "Hepatitis", value: "Hepatitis" },
  { key: "art", text: "Artritis", value: "Artritis" },
  {
    key: "psa",
    text: "Presion sanguinea alta",
    value: "Presion sanguinea alta",
  },
  { key: "ulce", text: "Úlcera de estómago", value: "Úlcera de estómago" },
  { key: "canc", text: "Cáncer", value: "Cáncer" },
  {
    key: "psb",
    text: "Presión sanguinea baja",
    value: "Presión sanguinea baja",
  },
  { key: "dc", text: "Dolor de cabeza", value: "Dolor de cabeza" },
  { key: "db", text: "Diabetes", value: "Diabetes" },
  {
    key: "enfv",
    text: "Enfermedades venéreas",
    value: "Enfermedades venéreas",
  },
  { key: "vih", text: "SIDA", value: "SIDA" },
  { key: "altn", text: "Alt. Nerviosas", value: "Alt. Nerviosas" },
  { key: "fbr", text: "Fiebre reumática", value: "Fiebre reumática" },
  { key: "epil", text: "Epilepsia", value: "Epilepsia" },
  { key: "sn", text: "Sinusitis", value: "Sinusitis" },
];

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
    gp = "", //Medico de cabecera
    gp_phone = "",
    medical_treatment = "", //Recibe algun tratamiento medico? Cual?
    allergies = "", //Alergia a algun medicamento?
    tooth_info = "", //Cuando se lastima o extrae algun diente sangra y necesita atencion?
    medicines = "", //Toma algun medicamento ¿cual?
    cigarettes = "", //Cuantos cigarrillos fuma?
    sex = "",
    pregnat = "",
  }
) => {
  //Vars
  const { setShowModal, user } = props;
  const affectionsArr = [];

  //Estados
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openCheck, setOpenCheck] = useState(false);
  const [openCheckA, setOpenCheckA] = useState(false);
  const [openCheckTooth, setOpenCheckTooth] = useState(false);

  //Handlers
  const handleChangeDropdown = (e, { value }) => {
    affectionsArr.push(value);
    console.log(affectionsArr);
  };
  //
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
        gp,
        gp_phone,
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
          .max(15, "Debe tener 15 caracteres o menos"),
        gp: Yup.string()
          .min(4, "Debe tener al menos 4 caracteres")
          .max(20, "Debe tener 20 caracteres o menos")
          .required("Debes completar este campo"),
        gp_phone: Yup.string()
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
          medical_insurance,
          phone_number,
          gp,
          gp_phone,
          medical_treatment,
          allergies
        } = values;
        const age = getEdad(birthdate);

        if (openCheckTooth) {
          values.tooth_info = "Si";
        } else {
          values.tooth_info = "No";
        }

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
          gp:gp,
          gp_phone:gp_phone,
          medical_treatment:medical_treatment,
          allergies:allergies,
          affections:affectionsArr[affectionsArr.length - 1]

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
        console.log(values);
        console.log(affectionsArr);

        setShowModal(false);
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
                    <Field name="medical_insurance">
                      {({ field }) => (
                        <Form.Field>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Obra social"
                            icon="clipboard"
                          />
                          {errors.medical_insurance &&
                            touched.medical_insurance ? (
                              <div className="error-text">
                                {errors.medical_insurance}
                              </div>
                            ) : null}
                        </Form.Field>
                      )}
                    </Field>
                    {/* --- */}
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
                    {/* --- */}
                  </Grid.Column>
                  {/* --- */}
                  <Grid.Column>
                    <h1>Ficha Medica</h1>
                    <Field name="gp">
                      {({ field }) => (
                        <Form.Field>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Nombre completo de medico de cabecera"
                            icon="user circle"
                          />
                          {errors.gp && touched.gp ? (
                            <div className="error-text">{errors.gp}</div>
                          ) : null}
                        </Form.Field>
                      )}
                    </Field>
                    {/* --- */}
                    <Field name="gp_phone">
                      {({ field }) => (
                        <Form.Field>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Numero de teléfono o celular medico de cabecera"
                            icon="phone"
                          />
                          {errors.gp_phone && touched.gp_phone ? (
                            <div className="error-text">{errors.gp_phone}</div>
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
                              placeholder="¿cuales?"
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
        );
      }}
    </Formik>
  );
};

export default withRouter(AddPatient);
