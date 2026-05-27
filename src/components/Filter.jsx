function Filter({ filterGenre }) {
  return (
    <select
      onChange={(e) => filterGenre(e.target.value)}
    >
      <option value="All">All</option>

      <option value="Fiction">Fiction</option>

      <option value="Self Help">Self Help</option>

      <option value="Biography">Biography</option>
    </select>
  );
}

export default Filter;