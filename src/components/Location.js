import React from "react";
import "./Location.css";

function Location(props) {
  return (
    <div className="location-list">
      <p>{props.name}</p>
    </div>
  );
}

export default Location;
