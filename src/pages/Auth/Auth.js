import React, { useState } from "react";
import AuthOptions from "../../components/Auth/AuthOptions";
import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm";
import BackgroundAuth from "../../assets/jpg/background.jpg";
import LogoNameColor from "../../assets/svg/logo-name-color.svg";

import "./Auth.scss";
const Auth = () => {
  const [selectedForm, setSelectedForm] = useState(null);

  const handlerForm = () => {
    switch (selectedForm) {
      case "login":
        return <LoginForm />;
      case "register":
        return <RegisterForm />;
      default:
        return <AuthOptions setSelectedForm={setSelectedForm} />
    }
  };

  return (
    <div className="auth" style={{backgroundImage:`url(${BackgroundAuth})`}}>
        <div className="auth__dark" />
        <div className="auth__box">
          <div className="auth__box-logo">
              <img src={LogoNameColor} alt="doctor-manager" />
          </div>
          {handlerForm()}
        </div>
    </div>
  );
};

export default Auth;
