import React, {Component} from 'react';

function Search(props) {
    return (
        <input id="searchText" className="form-control" type="text" placeholder="Buscar contacto"
            value={props.searchText} onChange={props.onSearch} />
    );
}

export default Search;

