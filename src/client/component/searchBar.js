import React from 'react';

const SearchBar = (props) => {
    const { setSearch, keyword } = props
    return (
        <input
            className='search-Bar'
            value={keyword}
            placeholder={"search ticket..."}
            onChange={(e) => setSearch(e.target.value)}
        />
    );
}

export default SearchBar;