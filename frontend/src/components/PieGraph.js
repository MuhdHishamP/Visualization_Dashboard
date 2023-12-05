import { Chart as ChartJS } from "chart.js/auto";
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import Filter from "./Filter";

export default function PieGraph({ data, labelName }) {
  const [filteredData, setFilteredData] = useState([]);
  const countryValue = {};

  filteredData.forEach((item) => {
    if (item.Value.length > 0) {
      if (item.Value in countryValue) {
        countryValue[item.Value] += 1;
      } else {
        countryValue[item.Value] = 1;
      }
    }
  });

  const colors = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
    "#FF99E6",
    "#CCFF1A",
    "#FF1A66",
    "#E6331A",
    "#33FFCC",
    "#66994D",
    "#B366CC",
    "#4D8000",
    "#B33300",
    "#CC80CC",
    "#66664D",
    "#991AFF",
    "#E666FF",
    "#4DB3FF",
    "#1AB399",
    "#E666B3",
    "#33991A",
    "#CC9999",
    "#B3B31A",
    "#00E680",
    "#4D8066",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#9900B3",
    "#E64D66",
    "#4DB380",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF",
  ];

  const PieData = {
    labels: Object.keys(countryValue),
    datasets: [
      {
        data: Object.values(countryValue),
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        backgroundColor: ["#673ab7"],
      },
    },
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ width: 100, margin: 20 }}>
          <Filter data={data} onFilter={setFilteredData} />
        </div>
        <div style={{ width: 550 }}>
          <Pie data={PieData} options={options} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "15px",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
            width: "30%",
            border: "solid grey 2px",
            minHeight: "120px",
            marginTop: "350px",
            marginLeft: "60px",
          }}
        >
          <p>
            You can toggle the{" "}
            <b>
              <u>{labelName}</u>
            </b>{" "}
            data displayed on the Pie Chart by clicking on the labels at the
            top. On the far left, you can conveniently adjust the data range to
            be visualized, ranging from 1 to 1000, directly sourced from the
            database.
          </p>
        </div>
      </div>
    </div>
  );
}
