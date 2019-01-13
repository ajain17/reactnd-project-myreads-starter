import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import Home from "./Home";
import Search from "./Search";

class BooksApp extends Component {
  state = {};

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

export default BooksApp;
