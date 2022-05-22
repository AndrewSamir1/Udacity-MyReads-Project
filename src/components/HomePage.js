import React from "react";
import Header from "../components/Header";
import Shelves from "../components/Shelves";
import { Link } from "react-router-dom";

const HomePage = ({ books, updateShelf }) => {
  return (
    <div className="list-books">
      <Header title="My Book Library" />
      <div className="list-books-content">
        <div>
          <Shelves books={books} updateShelf={updateShelf} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default HomePage;
