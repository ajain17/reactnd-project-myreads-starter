import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as BooksAPI from "./Api/BooksAPI";
import Home from "./Home";
import Search from "./Search";
import "./Styles/App.css";
class App extends Component {
  state = {
    myBooks: []
  };

  constructor(props) {
    super(props);
    this.initialize();
  }

  initialize = () => {
    BooksAPI.getAll().then(myBooks => {
      this.setState({ myBooks });
    });
  };

  updateBook = (bookToUpdate, shelf) => {
    BooksAPI.update(bookToUpdate, shelf).then(() => this.initialize());
  };

  render() {
    return (
      <Router>
        <div className="app">
          <Route
            exact
            path="/"
            render={() => (
              <Home myBooks={this.state.myBooks} onUpdate={this.updateBook} />
            )}
          />
          <Route
            path="/search"
            render={() => (
              <Search myBooks={this.state.myBooks} onUpdate={this.updateBook} />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
