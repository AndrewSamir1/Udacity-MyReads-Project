import React from "react";
const Book = ({ book, updateShelf }) => {
  //
  const changeShelf = (event) => {
    updateShelf(book, event.target.value);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: book.imageLinks
              ? `url(${book.imageLinks.smallThumbnail})`
              : "",
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            onChange={changeShelf}
            value={book.shelf ? book.shelf : "none"}
          >
            <option value="disabled" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors}</div>
    </div>
  );
};

export default Book;
