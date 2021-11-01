import React, { FormEvent, useState } from "react";
import AuthService from "../services/AuthService";
import { useHistory } from "react-router-dom";
import { userAtom } from "../store";
import { useAtom } from "jotai";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setUser] = useAtom(userAtom);
  const history = useHistory();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const result = await AuthService.login(username, password);

    if (result) {
      history.push("me");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='username'
        placeholder='username'
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type='password'
        name='password'
        placeholder='password'
        onChange={(event) => setPassword(event.target.value)}
      />
      <input type='submit' value='login' />
    </form>
  );
};

export default Login;
