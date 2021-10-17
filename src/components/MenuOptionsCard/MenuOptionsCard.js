import React, { useEffect } from "react"
import { Menu } from "semantic-ui-react"

function MenuOptionsCard(props) {
  const { setActiveItem, activeItem } = props

  const handleItemClick = (e, { name, value }) => setActiveItem(value)
  useEffect(() => {}, [activeItem])
  return (
    <div>
      <Menu pointing secondary>
        <Menu.Item
          name="Información Personal"
          value={"personal_info"}
          active={activeItem === "personal_info"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="Ficha medica"
          value={"medical_insurance"}
          active={activeItem === "medical_insurance"}
          onClick={handleItemClick}
        />
        <Menu.Item name="Seguro medico" />
      </Menu>
    </div>
  )
}

export default MenuOptionsCard
