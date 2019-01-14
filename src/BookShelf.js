import PropTypes from "prop-types";
import React from "react";
import BookShelfChanger from "./BookShelfChanger";

class BookShelf extends React.Component {
  constructor() {
    super();
  }
  render() {
    console.log(this.props);
    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.section}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.props.allBooks.map(book => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageLinks.thumbnail})`
                          }}
                        />
                        <BookShelfChanger currentShelf={book.shelf} />
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">
                        {book.authors.length === 1
                          ? book.authors[0]
                          : book.authors.join(", ")}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BookShelf.propTypes = {
  allBooks: PropTypes.array.isRequired,
  section: PropTypes.string.isRequired
};

export default BookShelf;
