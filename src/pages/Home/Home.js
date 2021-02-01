import { map } from "lodash";
import React, { useEffect, useState,useMemo } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert"; 
//Components
import {Buttons,FilterComponent} from "./MicroComponents/Buttons"
//Firebase
import firebase from "../../utils/Firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
//css
import "react-confirm-alert/src/react-confirm-alert.css";
//Vars
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
  {
    name: "Acciones",
    sortable: true,
    cell: (row) => (
      <Buttons row={row} confirmAlert={confirmAlert} db={db} toast={toast} />

    ),
  },
];
//Conexion a firestore
const db = firebase.firestore(firebase);

//
const Home = () => {
  const [pacientes, setPacientes] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(
    false
  );

  const filteredItems = pacientes.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = useMemo(() => {

    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  useEffect(() => {
    db.collection("pacientes")
      .get()
      .then((response) => {
        const arrayPacientes = [];
        map(response?.docs, (paciente) => {
          const data = paciente.data();
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
      data={filteredItems}
      
      pagination
      paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      selectableRows
      persistTableHead
      theme="solarized"
    />
  );
};

//Estilos
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

