import React, { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import MapContainer from "./components/MapContainer";
import escapeStringRegexp from "escape-string-regexp";
import locationList from "./components/List";
import Location from "./components/Location";

let showLocation;

function App() {
  const [currState, updateState] = useState({
    selectedPlace: {},
    showingInfoWindow: false,
    activeMarker: {},
  });

  function onMarkerClick(props, marker, e) {
    updateState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }

  function onMapClicked() {
    if (currState.showingInfoWindow) {
      updateState({
        selectedPlace: {},
        showingInfoWindow: false,
        activeMarker: {},
      });
    }
  }

  const [query, updateQuery] = useState("");

  function handleEventChange(event) {
    var val = event.target.value;
    val = val.trim();
    updateQuery(val);
  }

  if (query) {
    const match = new RegExp(escapeStringRegexp(query), "i");
    showLocation = locationList.filter((loc) => match.test(loc.title));
  } else {
    showLocation = locationList;
  }

  return (
    <div className="App">
      <div className="search-panel">
        <Search handleEventChange={handleEventChange} query={query} />
        <div className="place-list">
          {showLocation.map((place) => (
            <Location key={place.id} id={place.id} name={place.title} />
          ))}
        </div>
      </div>

      <MapContainer
        selectedPlace={currState.selectedPlace}
        onMarkerClick={onMarkerClick}
        activeMarker={currState.activeMarker}
        showingInfoWindow={currState.showingInfoWindow}
        showLocation={showLocation}
        onMapClicked={onMapClicked}
      />
    </div>
  );
}

export default App;
