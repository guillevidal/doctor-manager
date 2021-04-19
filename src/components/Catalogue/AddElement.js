import React, { useState } from "react";

//
import { toast } from "react-toastify";
//
import firebase from "../../utils/Firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
//
import "./AddElement.scss";

//Const global scope
const db = firebase.firestore(firebase);
const data = {
    
}
export const AddElement = () => {


    return (
        <div>
            <h1>Hi</h1>
        </div>
    )
}
