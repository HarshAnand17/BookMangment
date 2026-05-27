function SearchBar({ searchBooks }) {
  return (
    <input
      type="text"
      placeholder="Search by title or author"
      onChange={(e) => searchBooks(e.target.value)}
    />
  );
}

export default SearchBar;