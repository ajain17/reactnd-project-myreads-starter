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
    BooksAPI.search(this.state.query).then(allBooks =>
      this.setState({ allBooks })
    );
  }

  render() {
    // console.log(this.state.allBooks && this.state.allBooks.length);
    console.log(this.state.query);
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

        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.allBooks &&
              this.state.allBooks.map(book => (
                <Book
                  key={book.id}
                  book={book}
                  selectShelf={e => this.selectShelf(e, book.id)}
                />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
