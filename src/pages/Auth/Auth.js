import React, { useState } from "react";
import AuthOptions from "../../components/Auth/AuthOptions";
import LoginForm from "../../components/Auth/LoginForm";
import BackgroundAuth from "../../assets/jpg/background.jpg";
import LogoNameColor from "../../assets/svg/logo-name-color.svg";

import "./Auth.scss";
const Auth = () => {
  const [selectedForm, setSelectedForm] = useState(null);

  const handlerForm = () => {
    switch (selectedForm) {
      case "login":
        return <LoginForm setSelectedForm={setSelectedForm} />;
      default:
        return <AuthOptions setSelectedForm={setSelectedForm} />;
    }
  };

  return (
    <div className="auth" style={{ backgroundImage: `url(${BackgroundAuth})` }}>
      <div className="auth__dark" />
      <div className="auth__box">
        <div className="auth__box-logo">
          {!selectedForm && <img src={LogoNameColor} alt="doctor-manager" />}
        </div>
        {handlerForm()}
      </div>
    </div>
  );
};

export default Auth;
