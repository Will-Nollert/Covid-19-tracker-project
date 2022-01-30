import React from "react";
import numeral from "numeral";
import "./Table.css";

const Table = ({ countires }) => {
  return (
    <div className="table">
      {countires.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{numeral(cases).format("0.0a")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default Table;
