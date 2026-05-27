import { useEffect, useState } from "react";
import API from "./services/api";
import BookCard from "./components/BookCard";
import BookForm from "./components/BookForm";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";

function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const response = await API.get("/books");

      setBooks(response.data);
      setFilteredBooks(response.data);

      setError("");
    } catch (err) {
      setError("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteBook = async (id) => {
    try {
      await API.delete(`/books/${id}`);
      fetchBooks();
    } catch (err) {
      setError("Delete failed");
    }
  };

  const searchBooks = (searchText) => {
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchText.toLowerCase()) ||
        book.author.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredBooks(filtered);
  };

  const filterGenre = (genre) => {
    if (genre === "All") {
      setFilteredBooks(books);
      return;
    }

    const filtered = books.filter((book) => book.genre === genre);

    setFilteredBooks(filtered);
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="container">
      <h1>Book Management System</h1>

      {error && <p>{error}</p>}

      <BookForm
        fetchBooks={fetchBooks}
        editingBook={editingBook}
        setEditingBook={setEditingBook}
      />

      <SearchBar searchBooks={searchBooks} />

      <Filter filterGenre={filterGenre} />

      <div className="book-list">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            deleteBook={deleteBook}
            setEditingBook={setEditingBook}
          />
        ))}
      </div>
    </div>
  );
}

export default App;