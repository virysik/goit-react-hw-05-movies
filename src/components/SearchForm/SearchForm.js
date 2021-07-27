import { useState } from 'react';

function SearchForm({ onSubmit }) {
  const [query, setQuery] = useState('');

  function handleInputChange(e) {
    const { value } = e.currentTarget;
    setQuery(value);
  }

  function searchMovie(e) {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  }

  return (
    <form onSubmit={searchMovie}>
      <input
        onChange={handleInputChange}
        type="text"
        name="query"
        value={query}
      ></input>
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
