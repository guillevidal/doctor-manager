// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react"
import { DataContext } from "../../context/DataContext"
import { useHistory } from "react-router-dom"
import { Button, Search } from "semantic-ui-react"
import styled from "styled-components"

const Buttons = (props) => {
  const { row, confirmAlert, db, toast } = props
  // eslint-disable-next-line no-unused-vars
  const { render, setRender } = useContext(DataContext)

  const history = useHistory()
  const handleButtonClick = async (id) => {
    confirmAlert({
      title: "Confirme para eliminar",
      message: "¿Esta seguro de eliminar al paciente?.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await db
              .collection("pacientes")
              .doc(id)
              .delete()
              .then(function () {
                toast.success("Paciente Eliminad o con exito")
                setRender(false)
              })
              // eslint-disable-next-line node/handle-callback-err
              .catch(function (error) {
                toast.warning("Error al eliminar el paciente.")
              })
          },
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    })
  }

  const handleButtonClickArtist = async (row) => {
    history.push({
      pathname: "/pacient",
      search: "?query=abc",
      paciente: row,
    })
  }

  return (
    <div>
      <Button
        className="ui inverted red button"
        icon="trash"
        onClick={() => handleButtonClick(row.id)}
        id={row.id}
      ></Button>
      <Button
        className="ui inverted blue button"
        icon="eye"
        onClick={() => handleButtonClickArtist(row)}
        id={row.id}
      ></Button>
    </div>
  )
}

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <Search
      onSearchChange={onFilter}
      value={filterText}
      showNoResults={false}
    />
  </>
)

// eslint-disable-next-line no-unused-vars
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
`

export { Buttons, FilterComponent }
