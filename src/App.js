import React, { Component } from 'react';
import { HashRouter, BrowserRouter as Router,Route, Redirect, Switch } from 'react-router-dom'
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"

import AdminHome from "./admin/AdminHome/AdminHome"

class App extends Component {
  
  render() {
    return (
      <Router>
        <div className="App" style={{background: "#eee"}}>

            <Switch>
                <Route path={"/login"} component={Login}></Route>
                <Route path={"/register"} component={Register}></Route>
                <Route path={"/admin/:id"} component={AdminHome}></Route>
                <Route path={"/"} component={Home}></Route>
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
