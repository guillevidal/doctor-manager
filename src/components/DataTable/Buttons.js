import React, { useContext } from "react"
import { DataContext } from "../../context/DataContext"
import { useHistory } from "react-router-dom"
import { Button, Search } from "semantic-ui-react"

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
              .catch(function (error) {
                toast.warning("Error al eliminar el paciente.")
                throw error
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

export { Buttons, FilterComponent }
