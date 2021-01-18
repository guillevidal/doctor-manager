import { map } from "lodash";
import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";

import firebase from "../../utils/Firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const columns = [
  {
    name: "Apellido",
    selector: "surname",
    sortable: true,
  },
  {
    name: "Nombre",
    selector: "name",
    sortable: true,
  },
  {
    name: "DNI",
    selector: "dni",
    sortable: true,
  },
  {
    name: "Obra Social  ",
    selector: "medical_insurance",
    sortable: true,
  },
  {
    name: "Edad",
    selector: "age",
    sortable: true,
  },
  {
    name: "Numero de telefono",
    selector: "phone_number",
    sortable: true,
  },
];
const db = firebase.firestore(firebase);

const Home = () => {
  const [pacientes, setPacientes] = useState([]);
  useEffect(() => {
    db.collection("pacientes")
      .get()
      .then((response) => {
        const arrayPacientes = [];
        map(response?.docs, (paciente) => {
          const data = paciente.data();
          console.log(data);
          data.id = paciente.id;
          arrayPacientes.push(data);
        });
        console.log(arrayPacientes);
        setPacientes(arrayPacientes);
      });
  }, []);

  return (
    <DataTable
      title="Pacientes"
      columns={columns}
      data={pacientes}
      theme="solarized"
    />
  );
};

createTheme("solarized", {
  text: {
    primary: "#268bd2",
    secondary: "#2aa198",
  },
  background: {
    default: "#002b36",
  },
  context: {
    background: "#cb4b16",
    text: "#FFFFFF",
  },
  divider: {
    default: "#073642",
  },
  action: {
    button: "rgba(0,0,0,.54)",
    hover: "rgba(0,0,0,.08)",
    disabled: "rgba(0,0,0,.12)",
  },
});

export default Home;
