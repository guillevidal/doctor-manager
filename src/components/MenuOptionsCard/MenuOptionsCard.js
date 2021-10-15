import React, { useEffect } from "react"
import { Menu } from "semantic-ui-react"

function MenuOptionsCard(props) {
  const { setActiveItem, activeItem } = props

  const handleItemClick = (e, { name }) => setActiveItem(name)
  useEffect(() => {}, [activeItem])
  return (
    <div>
      <Menu pointing secondary>
        <Menu.Item
          name="personal_info"
          active={activeItem === "personal_info"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="a"
          active={activeItem === "a"}
          onClick={handleItemClick}
        />
        <Menu.Item name="Ficha medica" />
      </Menu>
    </div>
  )
}

export default MenuOptionsCard
