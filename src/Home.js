import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./Api/BooksAPI";
import Book from "./Book";
import { Options } from "./Models";

class Home extends React.Component {
  state = {
    allBooks: []
  };

  constructor() {
    super();
    BooksAPI.getAll().then(allBooks => {
      this.setState({ allBooks });
    });
    this.selectShelf = this.selectShelf.bind(this);
  }

  selectShelf(event, bookId) {
    let bookIndex = this.state.allBooks.findIndex(book => book.id === bookId);
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
                  {this.state.allBooks.filter(b => b.shelf === section).length >
                    0 && (
                    <>
                      <h2 className="bookshelf-title">{Options[section]}</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          {this.state.allBooks
                            .filter(book => book.shelf === section)
                            .map(book => (
                              <Book
                                key={book.id}
                                book={book}
                                selectShelf={e => this.selectShelf(e, book.id)}
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
