import { map } from "lodash";
import React, { useEffect, useState } from "react";
import { Button, Icon, Input, Form } from "semantic-ui-react";
import styled from 'styled-components';
import DataTable, { createTheme } from "react-data-table-component";
import firebase from "../../utils/Firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

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
];
const db = firebase.firestore(firebase);


//Componentes
const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField id="search" type="text" placeholder="Filter By Name" aria-label="Search Input" value={filterText} onChange={onFilter} />
    <ClearButton type="button" onClick={onClear}>X</ClearButton>
  </>
);

const Home = () => {
  const [pacientes, setPacientes] = useState([]);
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const filteredItems = pacientes.filter(item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));
  
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
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
const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Home;
