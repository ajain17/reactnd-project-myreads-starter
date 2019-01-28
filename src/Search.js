import PropTypes from "prop-types";
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
    BooksAPI.search(event.target.value.trim()).then(allBooks => {
      this.setState({ allBooks });

      if (this.state.allBooks && this.state.allBooks.length > 0) {
        /*
          update shelf for this book based on selection in my books
          since search api doesn't return shelf information
          */
        this.props.myBooks.map(myBook => {
          let myBookInSearchResultsIndex = this.state.allBooks.findIndex(
            b => b.id === myBook.id
          );

          if (myBookInSearchResultsIndex >= 0) {
            let updatedBook = this.state.allBooks[myBookInSearchResultsIndex];
            updatedBook.shelf = myBook.shelf;
            this.setState({
              allBooks: [
                ...this.state.allBooks.slice(0, myBookInSearchResultsIndex),
                updatedBook,
                ...this.state.allBooks.slice(myBookInSearchResultsIndex + 1)
              ]
            });
          }
        });
      }
    });
  }

  selectShelf(event, bookId) {
    let bookIndex = this.state.allBooks.findIndex(book => book.id === bookId);
    // a safety check, should always result to true
    if (bookIndex >= 0) {
      let bookToUpdate = this.state.allBooks[bookIndex];
      bookToUpdate["shelf"] = event.target.value;
      this.setState({
        allBooks: [
          ...this.state.allBooks.slice(0, bookIndex),
          bookToUpdate,
          ...this.state.allBooks.slice(bookIndex + 1)
        ]
      });

      // also update book in the backend
      this.props.onUpdate(bookToUpdate, event.target.value);
    }
  }

  render() {
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

Search.propTypes = {
  myBooks: PropTypes.array,
  onUpdate: PropTypes.func.isRequired
};
