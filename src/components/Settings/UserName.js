import React from "react";
import { Form, Input, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import firebase from "../../utils/Firebase";
import "firebase/auth";

export default function UserName(props) {
  const { user, setShowModal, setTitleModal, setContentModal } = props;

  const onEdit = () => {
    setTitleModal("Actualizar Nombre");
    setContentModal(
      <ChangeDisplayNameForm
        displayName={user.displayName}
        setShowModal={setShowModal}
      />
    );
    setShowModal(true);
  };
  return (
    <div className="user-name">
      <h2>{user.displayName}</h2>
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  );
}

function ChangeDisplayNameForm(props) {
  const { displayName, setShowModal } = props;
  const onSubmit = () =>{
      console.log("Actualizando");
      setShowModal(false); 
  }
  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
          <Input 
            defaultValue={displayName}
            // onChange ={}
          />
      </Form.Field>
      <Button type="submit">
          Actualizar nombre
      </Button>
    </Form>
  );
}
