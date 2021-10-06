import React from "react"

import DataTableFile from "../../components/DataTableFile"

import "./File.scss"

export const File = (props) => {
  const { user } = props

  return <DataTableFile user={user} />
}

export default File
