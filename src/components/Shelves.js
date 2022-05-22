import React from "react";
import Shelf from "./Shelf";

const Shelves = ({ books, updateShelf }) => {
  //Filtering Currently Reading Books
  const currentlyReading = books.filter(
    (book) => book.shelf === "currentlyReading"
  );

  //Filtering Want To Read Books
  const wantToRead = books.filter((book) => book.shelf === "wantToRead");

  //Filtering Read Books
  const read = books.filter((book) => book.shelf === "read");

  return (
    <div>
      <Shelf
        title="Currently Reading"
        books={currentlyReading}
        updateShelf={updateShelf}
      />
      <Shelf
        title="Want to Read"
        books={wantToRead}
        updateShelf={updateShelf}
      />
      <Shelf title="Read" books={read} updateShelf={updateShelf} />
    </div>
  );
};

export default Shelves;
