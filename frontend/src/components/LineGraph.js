import React, { useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import Filter from "./Filter";

export default function LineGraph({ data }) {
  const [filteredData, setFilteredData] = useState([]);

  const LineData = {
    labels: filteredData.map((item) => item.Id),
    datasets: [
      {
        label: "Start Year",
        data: filteredData.map((item) => item.StartYear),
        borderColor: "yellow",
        borderWidth: 4,
        borderDash: [],
        pointRadius: 0,
      },
      {
        label: "End Year",
        data: filteredData.map((item) => item.EndYear),
        borderColor: "lightgreen",
        borderWidth: 4,
        borderDash: [],
        pointRadius: 0,
      },
    ],
  };

  const options = {
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    plugins: {
      tooltip: {
        enabled: true,
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
        <div style={{ width: 1000 }}>
          <Line data={LineData} options={options} />
        </div>
      </div>
      <div
        style={{
          marginTop: "2px",
          marginLeft: "60px",
          padding: "3px",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
          textAlign: "center",
          width: "90%",
          border: "solid grey 2px",
        }}
      >
        The yellow line illustrates the{" "}
        <b>
          {" "}
          <u>Start Year</u>{" "}
        </b>{" "}
        values, while the green line depicts the{" "}
        <b>
          {" "}
          <u>End Year</u>{" "}
        </b>{" "}
        values. Click on these labels at the top to toggle the display of the
        corresponding lines. On the left, you can adjust the data range to be
        visualized from 1 to 1000 directly from the database.
      </div>
    </div>
  );
}
