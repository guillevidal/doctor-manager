import React from "react"
import { useSelector } from "react-redux"
import { Input, Button } from "semantic-ui-react"
import DataTable, { createTheme } from "react-data-table-component"

const columns = [
  {
    name: "Codigo",
    selector: (row) => row.codigo,
  },
  {
    name: "Descripcion",
    selector: (row) => row.descripcion,
  },
  {
    name: "costos_variables",
    selector: (row) => row.costos_variables,
  },
  {
    name: "costos_fijos",
    selector: (row) => row.costos_fijos,
  },
  {
    name: "costo_taller",
    selector: (row) => row.costo_taller,
  },
  {
    name: "costo_total",
    selector: (row) => row.costo_total,
  },
  {
    name: "honor_prof",
    selector: (row) => row.honor_prof,
  },
  {
    name: "total_arancel",
    selector: (row) => row.total_arancel,
  },
  {
    name: "tipo",
    selector: (row) => row.tipo,
  },
]

createTheme("dark", {
  background: {
    default: "transparent",
  },
})
const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <Input
      id="search"
      type="text"
      placeholder="Filtrar"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <Button content="X" primary onClick={onClear} />
  </>
)

const DataTableFichero = () => {
  const catalogue = useSelector((state) => state.catalogue)
  const [filterText, setFilterText] = React.useState("")
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false)
  const filteredItems = catalogue.filter(
    (item) =>
      item.codigo &&
      item.codigo.toLowerCase().includes(filterText.toLowerCase())
  )

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle)
        setFilterText("")
      }
    }

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    )
  }, [filterText, resetPaginationToggle])

  return (
    <DataTable
      title="Lista de precios"
      columns={columns}
      data={filteredItems}
      selectableRows
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      persistTableHead
      pagination
    />
  )
}
export default DataTableFichero
