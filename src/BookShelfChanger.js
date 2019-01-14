import PropTypes from "prop-types";
import React from "react";
import { Options } from "./Models";

const BookShelfChanger = props => {
  let options = Options;
  //adding extra option here because it only needs to be in selector

  options["none"] = "None";

  return (
    <div className="book-shelf-changer">
      <select value={props.currentShelf}>
        <option value="move" disabled>
          Move to...
        </option>

        {Object.keys(options).map(option => (
          <option key={option} value={option}>
            {options[option]}
          </option>
        ))}
      </select>
    </div>
  );
};

BookShelfChanger.propTypes = {
  currentShelf: PropTypes.string.isRequired
};

export default BookShelfChanger;
