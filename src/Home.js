import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";
import { Options } from "./Models";

class Home extends Component {
  state = {
    allBooks: []
  };

  constructor() {
    super();
    BooksAPI.getAll().then(allBooks => {
      this.setState({ allBooks });
    });
  }

  render() {
    let options = Options;
    let index = 0;
    return (
      <>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>

          {Object.keys(options).map(option => (
            <BookShelf
              key={index++}
              allBooks={this.state.allBooks.filter(
                book => book.shelf === option
              )}
              section={options[option]}
            />
          ))}
        </div>
      </>
    );
  }
}

export default Home;
