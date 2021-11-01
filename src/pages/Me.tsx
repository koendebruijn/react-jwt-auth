import { useAtom } from "jotai";
import React from "react";
import Logout from "../components/Logout";
import { userAtom } from "../store";

const Me = () => {
  const [user] = useAtom(userAtom);

  return (
    <>
      <div>
        <p>id: {user?.id}</p>
        <p>name: {user?.name}</p>
        <p>username: {user?.username}</p>
      </div>
      <Logout />
    </>
  );
};

export default Me;
