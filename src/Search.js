import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./Api/BooksAPI";
import Book from "./Book";
class Search extends React.Component {
  state = {
    query: "",
    allBooks: []
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
    BooksAPI.search(event.target.value.trim()).then(allBooks =>
      this.setState({ allBooks })
    );
  }

  render() {
    console.log(this.state);
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.handleChange}
            />
          </div>
        </div>
        {this.state.allBooks && this.state.allBooks instanceof Array ? (
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.allBooks.map(book => (
                <Book
                  key={book.id}
                  book={book}
                  selectShelf={e => this.selectShelf(e, book.id)}
                />
              ))}
            </ol>
          </div>
        ) : (
          <h2 className="no-results"> No results found!! </h2>
        )}
      </div>
    );
  }
}

export default Search;
