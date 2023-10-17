import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn : false,
  onLogout: () => {},
  onLogin: (email, collegeName, password) => {},
});
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userLoginInfo = localStorage.getItem("isLoggedIn");
    if (userLoginInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);
  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };
  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };
return <AuthContext.Provider
   value={{
    isLoggedIn : isLoggedIn,
    onLogout : logoutHandler,
    onLogin : loginHandler
   }}
>
  {props.children}
</AuthContext.Provider>;
};
export default AuthContext;
