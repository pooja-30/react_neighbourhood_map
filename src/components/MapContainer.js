import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { useState, useEffect } from "react";
import "./Map.css";

const API = "https://api.foursquare.com/v2/venues/";
const AuthURL =
  "?&client_id=OCOENKHAZZJTCSIZJN2ZCMUEJE01GLSCVBV3PAVGR5KVL2TA&client_secret=0TN5PQPW1CBY2ZGWCPF3GYGPZ500RDUEIE5IPPI4D1W42IVM&v=20170101";

function MapContainer(props) {
  const [data, updateData] = useState({
    rating: "",
    url: "",
  });

  useEffect(async () => {
    const resp = await fetch(API + props.selectedPlace.index + AuthURL);
    const json = await resp.json();
    if (json != undefined || json != null) {
      const item = json.response.venue;
      if (item != undefined || item != null) {
        updateData({
          rating: item.rating,
          url: item.shortUrl,
        });
      }
    }
  }, [props.selectedPlace.index]);

  return (
    <div className="map">
      <Map
        google={props.google}
        initialCenter={{
          lat: 30.7539,
          lng: 76.8457,
        }}
        zoom={13}
        onClick={props.onMapClicked}
      >
        {props.showLocation.map((marker) => {
          return (
            <Marker
              key={marker.id}
              name={marker.title}
              index={marker.id}
              onClick={props.onMarkerClick}
              position={{ lat: marker.location.lat, lng: marker.location.lng }}
            ></Marker>
          );
        })}
        <InfoWindow
          marker={props.activeMarker}
          visible={props.showingInfoWindow}
        >
          <div>
            <h4>{props.selectedPlace.name}</h4>
            <p>Rating: {data.rating} </p>
            <p>
              <a href={data.url}>Visit Here</a>
            </p>
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyB7rD7Tpu_w3yFHUqDUPEU_VeiYCUTGRYM",
})(MapContainer);
