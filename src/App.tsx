import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Me from "./pages/Me";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Switch>
      <Route path='/login' component={Login} />
      <Route exact path='/' component={Home} />
      <ProtectedRoute path='/me' component={Me}></ProtectedRoute>
    </Switch>
  );
}

export default App;
