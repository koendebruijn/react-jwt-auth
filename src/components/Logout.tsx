import { useAtom } from "jotai";
import React from "react";
import { useHistory } from "react-router";
import AuthService from "../services/AuthService";
import { userAtom } from "../store";

const Logout = () => {
  const [, setUser] = useAtom(userAtom);
  const history = useHistory();

  const logoutHandler = async () => {
    const isLoggedOut = await AuthService.logout();

    if (isLoggedOut) {
      setUser(undefined);
      history.push("/login");
    }
  };

  return <button onClick={() => logoutHandler()}>logout</button>;
};

export default Logout;
