import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import { Options } from "./Models";
class Home extends React.Component {
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
                                selectShelf={this.props.onChange}
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

Home.propTypes = {
  // book: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Home;
