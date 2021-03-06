import { Circle, Popup } from "react-leaflet";
import React from "react";
import numeral from "numeral";
import { green, orange, red } from "@material-ui/core/colors";

const casesTypeColors = {
  cases: {
    hex: "#cc1034",
    rgb: "rgb(255, 0, 0)",
    color: red,
    multiplier: 80,
  },
  recovered: {
    hex: "#6bd71d",
    rgb: "rgb(0, 128, 0)",
    multiplier: 120,
    color: green,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(0, 0, 255)",
    multiplier: 200,
    color: orange,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
