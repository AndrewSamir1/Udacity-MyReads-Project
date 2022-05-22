import React from "react";
import Book from "./Book";

const SearchShelf = ({
  searchBooks,
  updateShelf,
  isSearchActive,
  debouncedSearchQuery,
}) => {
  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {isSearchActive ? (
          searchBooks.map((book) => (
            <li key={book.id}>
              <Book book={book} updateShelf={updateShelf} />
            </li>
          ))
        ) : (
          <h1>{`No Books Found Under "${debouncedSearchQuery}"`}</h1>
        )}
      </ol>
    </div>
  );
};

export default SearchShelf;
