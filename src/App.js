import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import "./Styles/App.css";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path="/" component={Home} />
          <Route path="/search" component={Search} />
        </div>
      </Router>
    );
  }
}

export default App;
