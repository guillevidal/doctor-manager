import React,{useEffect,useState} from 'react'
import { withRouter } from "react-router-dom";

 function Pacient(props) {
    const {location} = props;
    if (location.paciente) {
        var pacient = location.paciente;
    }


    return (
        <div>
            <h1>hola {pacient.name}</h1>
        </div>
    )
}
export default withRouter(Pacient);