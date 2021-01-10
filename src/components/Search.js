import React, { useState } from "react";
import "./Search.css";

function Search(props) {
  return (
    <div className="search-bar">
      <input
        type="search"
        id="gsearch"
        name="gsearch"
        placeholder="Search Here..."
        className="search"
        value={props.query}
        onChange={props.handleEventChange}
        autocomplete="off"
      />
    </div>
  );
}

export default Search;
