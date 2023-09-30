import React, { useState } from "react";
import { LoginEmpl } from "./LoginEmpl";
import { LoginOrg } from "./Shop/LoginOrg";

export const ScreenMode = {
  LOGIN_EMPL: "LOGIN_EMPL",
  LOGIN_ORG: "LOGIN_ORG",
};

const LoginMain = () => {
  const [currMode, setCurrMode] = useState(ScreenMode.LOGIN_EMPL);
  const onSwitchMode = (mode) => {
    setCurrMode(mode);
  };

  return <div>{currMode === ScreenMode.LOGIN_EMPL ? <LoginEmpl onSwitchMode={onSwitchMode} /> : <LoginOrg onSwitchMode={onSwitchMode} />}</div>;
};

export default LoginMain;
