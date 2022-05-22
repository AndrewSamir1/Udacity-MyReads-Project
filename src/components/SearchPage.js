import React from "react";
import { Link } from "react-router-dom";
import SearchShelf from "./SearchShelf";

const SearchPage = ({
  searchQuery,
  handleSearch,
  searchBooks,
  updateShelf,
  isSearchActive,
  debouncedSearchQuery,
}) => {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search"></Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={handleSearch}
            value={searchQuery}
          />
        </div>
      </div>

      <SearchShelf
        searchBooks={searchBooks}
        updateShelf={updateShelf}
        isSearchActive={isSearchActive}
        debouncedSearchQuery={debouncedSearchQuery}
      />
    </div>
  );
};

export default SearchPage;
