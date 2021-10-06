import React, { useEffect, useState, useContext } from "react"
import { DataContext } from "../../context/DataContext"

import { map } from "lodash"
import { toast } from "react-toastify"
import { confirmAlert } from "react-confirm-alert"
// Components
import { Buttons } from "../../components/DataTable/Buttons"
// Firebase
import firebase from "../../utils/Firebase"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
// css
import "react-confirm-alert/src/react-confirm-alert.css"
// Vars
// eslint-disable-next-line no-unused-vars
const columns = [
  {
    name: "Apellido",
    selector: (row) => `${row.surname}`,
    sortable: true,
  },
  {
    name: "Nombre",
    selector: (row) => `${row.name}`,
    sortable: true,
  },
  {
    name: "DNI",
    selector: (row) => `${row.dni}`,
    sortable: true,
  },
  {
    name: "Obra Social  ",
    selector: (row) => `${row.medical_insurance}`,
    sortable: true,
  },
  {
    name: "Edad",
    selector: (row) => `${row.age}`,
    sortable: true,
  },
  {
    name: "Numero de telefono",
    selector: (row) => `${row.phone_number}`,
    sortable: true,
  },
  {
    name: "Acciones",
    sortable: true,
    cell: (row) => (
      <Buttons row={row} confirmAlert={confirmAlert} db={db} toast={toast} />
    ),
  },
]
// Conexion a firestore
const db = firebase.firestore(firebase)

//
const Home = (props) => {
  const { render, setRender } = useContext(DataContext)
  // eslint-disable-next-line no-unused-vars
  const [pacientes, setPacientes] = useState([])

  useEffect(() => {
    setRender(true)
    db.collection("pacientes")
      .get()
      .then((response) => {
        const arrayPacientes = []
        if (response.length !== 0) {
          map(response.docs, (paciente) => {
            const data = paciente.data()
            data.id = paciente.id
            arrayPacientes.push(data)
          })
        }
        setPacientes(arrayPacientes)
      })
  }, [render])

  return <h1>Hola</h1>
}

export default Home
