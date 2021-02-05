import React, { useState, useEffect } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { isUserAdmin } from "../../utils/Api";
import BasicModal from "../Modal/BasicModal";
import RegisterForm from "../Auth/RegisterForm";
import AddPatient from "../Patient/AddPatient";

import "./MenuLeft.scss";

function MenuLeft(props) {
  const { user, location } = props;
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [userAdmin, setuserAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);

 useEffect(() => {
   setActiveMenu(location.pathname);
 }, [location]);

  useEffect(() => {
    isUserAdmin(user.uid).then((response) => setuserAdmin(response));
  }, [user]);

  const handlerMenu = (e, menu) => {
    setActiveMenu(menu.to);
    //
  };
  const handlerModal = (type) => {
    switch (type) {
      case "paciente":
        setContentModal(<AddPatient user={user} setShowModal={setShowModal} />);
        setShowModal(true);
        break;
      case "usuario":
        setContentModal(<RegisterForm setShowModal={setShowModal} setContentModal={setContentModal} />);
        setShowModal(true);
        break;
      default:
        setTitleModal(null);
        setContentModal(null);
        setShowModal(false);

        break;
    }
  };
  return (
    <>
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
            <Menu.Item name="usuario" onClick={()=>handlerModal("usuario")}>
              <Icon name="plus square outline" /> Nuevo Usuario
            </Menu.Item>
            <Menu.Item name="paciente" onClick={()=>handlerModal("paciente")}>
              <Icon name="plus square outline" /> Nueva Paciente
            </Menu.Item>
          </div>
        )}
      </Menu>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {contentModal}
      </BasicModal>
    </>
  );
}

export default withRouter(MenuLeft);
