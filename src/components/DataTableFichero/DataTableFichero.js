import React from "react"
import DataTable, { createTheme } from "react-data-table-component"

const columns = [
  {
    name: "Title",
    selector: (row) => row.title,
  },
  {
    name: "Year",
    selector: (row) => row.year,
  },
]
const data = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
]
createTheme("dark", {
  background: {
    default: "transparent",
  },
})
const DataTableFichero = () => {
  return <DataTable columns={columns} data={data} selectableRows />
}
export default DataTableFichero
