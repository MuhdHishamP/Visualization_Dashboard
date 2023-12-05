import { Chart as ChartJS } from "chart.js/auto";
import React from "react";
import { Bar } from "react-chartjs-2";

export default function BarGraph({ data, labelName }) {
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
        backgroundColor: ["grey"],
        hoverBackgroundColor: ["grey"],
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
      <Bar data={BarData} options={options} />
      <div
        style={{
          marginTop: "10px",
          marginLeft: "100px",
          padding: "3px",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
          textAlign: "center",
          width: "80%",
          border: "solid grey 2px",
        }}
      >
        These Bars represent the count of each
        <b>
          {" "}
          <u>{labelName}</u>{" "}
        </b>
        value within the range {Object.keys(BarValue)[0]} to{" "}
        {Object.keys(BarValue)[Object.keys(BarValue).length - 1]}, as obtained
        from the database.
      </div>
    </div>
  );
}
