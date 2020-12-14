import React, { useState, useEffect } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { isUserAdmin } from "../../utils/Api";
import "./MenuLeft.scss";

function MenuLeft(props) {
  const { user, location } = props;
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [userAdmin, setuserAdmin] = useState(false);
  console.log(userAdmin);
  useEffect(() => {
    isUserAdmin(user.uid).then((response) => setuserAdmin(response));
  }, [user]);

  const handlerMenu = (e, menu) => {
    setActiveMenu(menu.to);
    //
  };

  return (
    <Menu className="menu-left" vertical>
      <div className="top">
        <Menu.Item
          as={Link}
          to="/"
          onClick={handlerMenu}
          active={activeMenu === "/"}
        >
          <Icon name="home" /> Inicio
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/archivo"
          onClick={handlerMenu}
          active={activeMenu === "/archivo"}
        >
          <Icon name="archive" /> Archivo
        </Menu.Item>
      </div>

      {userAdmin && (
        <div className="footer">
          <Menu.Item name="artists">
            <Icon name="plus square outline" /> Nuevo Usuario
          </Menu.Item>
          <Menu.Item name="artists">
            <Icon name="plus square outline" /> Nueva Paciente
          </Menu.Item>
        </div>
      )}
    </Menu>
  );
}

export default withRouter(MenuLeft);
