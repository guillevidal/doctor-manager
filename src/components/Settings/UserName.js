import React, { useState } from "react";
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
  const [formData, setFormData] = useState({ displayName: displayName });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    if (!formData.displayName || formData.displayName === displayName) {
      setShowModal(false);
    } else {
      setIsLoading(true);
      firebase
        .auth()
        .currentUser.updateProfile({ displayName: formData.displayName })
        .then(()=>{
          toast.success("Nombre actualizado");
          setShowModal(false);
        }).catch(()=>{
          toast.error("Error al actualizar el nombre");
          setIsLoading(false);
          setShowModal(false);
        });
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          defaultValue={displayName}
          onChange={(e) => setFormData({ displayName: e.target.value })}
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Actualizar nombre
      </Button>
    </Form>
  );
}
