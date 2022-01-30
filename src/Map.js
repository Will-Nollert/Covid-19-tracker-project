import React from "react";
import "./Map.css";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import { showDataOnMap } from "./utils";

function covidMap({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom} casesType={casesType}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {console.log(casesType)}
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default covidMap;
