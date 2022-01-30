import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      lable: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("0,0");
      },
    },
  },
  scales: {
    x: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    y: [
      { beginAtZero: true },
      {
        grideLines: {
          display: false,
        },
        tricks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

//option2
/* const options = {
  options: {
    scales: {
      x: {
        type: "time",
        display: true,
        title: {
          display: true,
          text: "Date",
        },
        ticks: {
          major: {
            enabled: true,
          },
          color: (context) => context.tick && context.tick.major && "#FF0000",
          font: function (context) {
            if (context.tick && context.tick.major) {
              return {
                weight: "bold",
              };
            }
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "value",
        },
      },
    },
  },
}; */
const buildChartData = (data, casesType = "cases") => {
  const chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType = "cases" }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
          console.log(chartData);
        });
    };
    fetchData();
  }, [casesType]);

  return (
    <div>
      <h1>im a graph</h1>
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                label: "first data set",
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default LineGraph;
