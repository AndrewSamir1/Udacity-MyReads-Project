import "./App.css";
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAll, update, search as searchRequest } from "./BooksAPI";

const App = () => {
  //Initalizing State
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setdebouncedSearchQuery] = useState("");
  const [searchBooks, setSearchBooks] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(true);
  // eslint-disable-next-line
  const [mergedBooks, setMergedBooks] = useState("");

  //Rendereing Books at first Render
  useEffect(() => {
    const getAllBooks = async () => {
      const allBooks = await getAll();
      setBooks(allBooks);
    };
    getAllBooks();
  }, []);

  //Debouncing Search Text in 500ms
  useEffect(() => {
    const timerId = setTimeout(() => {
      setdebouncedSearchQuery(searchQuery);
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery]);

  //Rerendering When Debounced Text Changes
  useEffect(() => {
    if (debouncedSearchQuery) {
      handleSearchRequest(debouncedSearchQuery);
    }
    return () => {
      setSearchBooks([]);
      setIsSearchActive(true);
    };
    // eslint-disable-next-line
  }, [debouncedSearchQuery]);

  //Rerendering When Shelf Changes In Search
  useEffect(() => {
    if (debouncedSearchQuery) {
      handleSearchRequest(debouncedSearchQuery);
    }
    // eslint-disable-next-line
  }, [books]);

  //Updating Shelf Method
  const updateShelf = async (book, shelf) => {
    await update(book, shelf);
    await getAll().then((data) => setBooks(data));
  };

  // Handling Search Function
  const handleSearch = async (event) => {
    await setSearchQuery(event.target.value);
  };

  //Handlign Search Response Behaviour
  const handleSearchRequest = async () => {
    let response = await searchRequest(searchQuery); //get search response from api
    if (response && !response.error) {
      //if the response is not an error
      const combinedBooks = response.map((searchBooks) => {
        //variable to store search books with shelf value
        books.forEach((book) => {
          // loop over books
          if (searchBooks.id === book.id) {
            // if both books are in library and search result
            searchBooks.shelf = book.shelf; // add shelf value to the book in search result
          }
        });
        return searchBooks; // return the modified search result
      });
      setMergedBooks(combinedBooks);
      await setSearchBooks(combinedBooks);
      await setIsSearchActive(true);
    } else if (response.error) {
      await setIsSearchActive(false);
    } else {
      await setSearchBooks([]);
    }
  };

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<HomePage books={books} updateShelf={updateShelf} />}
      />
      <Route
        exact
        path="/search"
        element={
          <SearchPage
            handleSearch={handleSearch}
            searchQuery={searchQuery}
            searchBooks={searchBooks}
            updateShelf={updateShelf}
            isSearchActive={isSearchActive}
            debouncedSearchQuery={debouncedSearchQuery}
          />
        }
      />
    </Routes>
  );
};

export default App;
