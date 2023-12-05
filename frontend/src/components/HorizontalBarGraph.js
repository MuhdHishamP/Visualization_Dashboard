import { Chart as ChartJS } from "chart.js/auto";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

export default function HorizontalBarGraph({ data, labelName }) {
  const BarValue = {};

  data.forEach((item) => {
    if (item.Value.length > 0) {
      if (item.Value in BarValue) {
        BarValue[item.Value] += 1;
      } else {
        BarValue[item.Value] = 1;
      }
    }
  });

  const BarData = {
    labels: Object.keys(BarValue),
    datasets: [
      {
        label: labelName,
        data: Object.values(BarValue),
        backgroundColor: ["#FFBF00"],
        hoverBackgroundColor: ["#FFBF00"],
        borderRadius: 10,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    plugins: {
      tooltip: {
        backgroundColor: ["#673ab7"],
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div>
      <div style={{ width: 1000, marginLeft: 60 }}>
        <Bar data={BarData} options={options} />
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
        The horizontal bars represent different{" "}
        <b>
          {" "}
          <u>{labelName}</u>{" "}
        </b>{" "}
        values obtained from the database. Each bar represents the frequency of
        a specific {labelName} value.{" "}
      </div>
    </div>
  );
}
