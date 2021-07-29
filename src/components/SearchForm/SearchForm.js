import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { GiLaserWarning } from 'react-icons/gi';
import PropTypes from 'prop-types';

function SearchForm({ onSubmit }) {
  const [query, setQuery] = useState('');

  function handleInputChange(e) {
    const { value } = e.currentTarget;
    setQuery(value);
  }

  function searchMovie(e) {
    e.preventDefault();

    if (query.trim() === '') {
      return toast('Please enter a query', {
        icon: <GiLaserWarning />,
      });
    }
    onSubmit(query.trim());
    setQuery('');
  }

  return (
    <>
      <form onSubmit={searchMovie}>
        <input
          onChange={handleInputChange}
          type="text"
          name="query"
          value={query}
          autoComplete="off"
          autoFocus
        ></input>
        <button type="submit">Search</button>
      </form>
      <Toaster />
    </>
  );
}

export default SearchForm;

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
