import React from 'react';

const SearchBar = ({ city, onCityChange, onSearch }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        value={city}
        placeholder="Search by city (e.g., Toronto or London, CA)"
        onChange={(e) => onCityChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="search-button" onClick={onSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
