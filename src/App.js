import React from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Feed from "./Components/Feed";
import Widgets from "./Components/Widgets";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Components/Login";
import Login2 from "./Components/Login2";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login2} />
          <Route
            exact
            path="/home"
            render={() => (
              <>
                <Sidebar /> <Feed /> <Widgets />
              </>
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
