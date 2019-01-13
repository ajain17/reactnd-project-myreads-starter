import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";

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
    return (
      <>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>

          <BookShelf
            allBooks={this.state.allBooks.filter(
              book => book.shelf === "currentlyReading"
            )}
            section="CurrentlyReading"
          />
          <BookShelf
            allBooks={this.state.allBooks.filter(
              book => book.shelf === "wantToRead"
            )}
            section="Want To Read"
          />
          <BookShelf
            allBooks={this.state.allBooks.filter(book => book.shelf === "read")}
            section="Read"
          />
        </div>
      </>
    );
  }
}

export default Home;
