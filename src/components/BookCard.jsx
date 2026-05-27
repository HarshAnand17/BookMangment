function BookCard({ book, deleteBook, setEditingBook }) {
  return (
    <div className="card">
      <h3>{book.title}</h3>

      <p>Author: {book.author}</p>

      <p>Genre: {book.genre}</p>

      <p>Year: {book.year}</p>

      <button onClick={() => setEditingBook(book)}>
        Edit
      </button>

      <button onClick={() => deleteBook(book.id)}>
        Delete
      </button>
    </div>
  );
}

export default BookCard;