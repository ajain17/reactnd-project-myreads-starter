import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as BooksAPI from "./Api/BooksAPI";
import Home from "./Home";
import Search from "./Search";
import "./Styles/App.css";
class App extends Component {
  state = {
    myBooks: [],
    allBooks: []
  };

  constructor(props) {
    super(props);
    this.selectShelf = this.selectShelf.bind(this);
    BooksAPI.getAll().then(myBooks => {
      this.setState({ myBooks });
    });
  }

  selectShelf(event, bookId) {
    console.log("select shelf", event, bookId);
    let bookIndex = this.state.myBooks.findIndex(book => book.id === bookId);
    if (bookIndex >= 0) {
      let bookToUpdate = this.state.myBooks[bookIndex];
      bookToUpdate["shelf"] = event.target.value;
      this.setState({
        myBooks: [
          ...this.state.myBooks.slice(0, bookIndex),
          bookToUpdate,
          ...this.state.myBooks.slice(bookIndex + 1)
        ]
      });
    }
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Route
            exact
            path="/"
            render={() => (
              <Home myBooks={this.state.myBooks} onChange={this.selectShelf} />
            )}
          />
          <Route path="/search" component={Search} />
        </div>
      </Router>
    );
  }
}

export default App;
