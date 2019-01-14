import PropTypes from "prop-types";
import React from "react";
import BookShelfChanger from "./BookShelfChanger";

class Book extends React.Component {
  render() {
    return (
      <>
        {this.props.book && (
          <li key={this.props.book.id}>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${
                      this.props.book.imageLinks.thumbnail
                    })`
                  }}
                />
                <BookShelfChanger
                  currentShelf={this.props.book.shelf}
                  selectShelf={this.props.selectShelf}
                />
              </div>
              <div className="book-title">{this.props.book.title}</div>
              <div className="book-authors">
                {this.props.book.authors.length === 1
                  ? this.props.book.authors[0]
                  : this.props.book.authors.join(", ")}
              </div>
            </div>
          </li>
        )}
      </>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  selectShelf: PropTypes.func.isRequired
};

export default Book;
