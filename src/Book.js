import PropTypes from "prop-types";
import React from "react";
import BookShelfChanger from "./BookShelfChanger";

class Book extends React.Component {
  //Some book objects do not have imageLinks property; UI breaks without null checks
  getBackground = () => {
    let backgroundImage = "";
    if (this.props.book.imageLinks) {
      backgroundImage =
        this.props.book.imageLinks.thumbnail !== null
          ? this.props.book.imageLinks.thumbnail
          : this.props.book.imageLinks.smallThumbnail !== null
          ? this.props.book.imageLinks.smallThumbnail
          : "";
    }

    return backgroundImage;
  };

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
                    backgroundImage: `url(${this.getBackground()})`
                  }}
                />
                <BookShelfChanger
                  currentShelf={this.props.book.shelf}
                  selectShelf={this.props.selectShelf}
                  bookId={this.props.book.id}
                />
              </div>
              <div className="book-title">{this.props.book.title}</div>
              <div className="book-authors">
                {this.props.book.authors && this.props.book.authors.length > 0
                  ? this.props.book.authors.join(", ")
                  : ""}
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
