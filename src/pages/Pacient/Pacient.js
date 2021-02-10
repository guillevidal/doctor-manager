import React from 'react'
import { withRouter } from "react-router-dom";

 function Pacient(props) {
    const {location} = props;
    if (location.paciente) {
        var pacient = location.paciente;
    }


    return (
        <div>
            {pacient && <h1>Ficha del paciente</h1> }
            {pacient  && <div>
                <ul>
                    <li>Nombre y Apellido: {pacient.name} {pacient.surname}</li>
                    <li>DNI: {pacient.dni}</li>
                    {pacient.phone_number && (<li>Numero de telefono: {pacient.phone_number }</li>) }  
                    <li>Seguro medico: {pacient.medical_insurance}</li>
                    <li>Edad: {pacient.age}</li>
                </ul>
            </div>}

            
        </div>
    )
}
export default withRouter(Pacient);