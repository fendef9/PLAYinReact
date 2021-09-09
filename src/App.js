import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom"
import "./App.scss";
import Signin from "./components/Signin";
import Profile from "./components/Profile";
import Toolbar from "./components/Toolbar";
import Library from "./components/Library";
import Games from "./components/Games"
import Friends from "./components/Friends";

class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <div className="App">
          <div className="Content-wrapper">
              <Toolbar />
              <Switch>
                <Route exact path="/" component={Signin} />
                <Route path="/games" component={Games} />
                <Route path="/profile" component ={Profile} />
                <Route path="/friends" component ={Friends} />
                <Route path="/library" component ={Library} />
              </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;