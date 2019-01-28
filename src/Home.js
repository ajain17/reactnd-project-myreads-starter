import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import { Options } from "./Models";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.selectShelf = this.selectShelf.bind(this);
  }

  selectShelf(event, bookId) {
    let bookIndex = this.props.myBooks.findIndex(book => book.id === bookId);
    // a safety check, should always result to true
    if (bookIndex >= 0) {
      let bookToUpdate = this.props.myBooks[bookIndex];
      bookToUpdate["shelf"] = event.target.value;
      this.setState({
        myBooks: [
          ...this.props.myBooks.slice(0, bookIndex),
          bookToUpdate,
          ...this.props.myBooks.slice(bookIndex + 1)
        ]
      });

      this.props.onUpdate(bookToUpdate, event.target.value);
    }
  }

  render() {
    let index = 0;
    return (
      <React.Fragment>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>

          {Object.keys(Options).map(section => (
            <div key={index++} className="list-books-content">
              <div>
                <div className="bookshelf">
                  {this.props.myBooks.filter(b => b.shelf === section).length >
                    0 && (
                    <>
                      <h2 className="bookshelf-title">{Options[section]}</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          {this.props.myBooks
                            .filter(book => book.shelf === section)
                            .map(book => (
                              <Book
                                key={book.id}
                                book={book}
                                selectShelf={this.selectShelf}
                              />
                            ))}
                        </ol>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="open-search">
          <Link className="open-search-link" to="/search">
            Add a book
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;

Home.propTypes = {
  myBooks: PropTypes.array,
  onUpdate: PropTypes.func.isRequired
};
