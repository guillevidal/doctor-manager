import React from "react";
import {Button} from "semantic-ui-react";

export default function UserEmail(props) {
  const { user, setShowModal, setTitleModal, setContentModal } = props;
  
  const onEdit = () =>{
      console.log("Ediando email...");
  }
  
  return (
    <div className="user-email">
      <h3>Email:{user.email}</h3>
      <Button circular onClick={onEdit} >
          Actualizar
      </Button>
    </div>
  );
}
