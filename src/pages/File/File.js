import React, { useEffect } from "react"
import DataTableFichero from "../../components/DataTableFichero"
import { catalogo } from "../../utils/catalogoObject"
import { useDispatch } from "react-redux"
import { catalogue } from "../../redux/actions"
import "./File.scss"

export const File = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(catalogue(catalogo))
  }, [])
  return <DataTableFichero />
}

export default File
