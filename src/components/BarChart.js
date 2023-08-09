import React, { useState, useEffect } from "react";
import * as d3 from "d3";

const RotatedBarChart = () => {
  const [barCount, setBarCount] = useState(10); // Initial number of bars
  const maxBarsPerColumn = 10;
  const colors = ["#FF5733", "#FFC300", "#FF1493", "black", "#0074D9"];

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  useEffect(() => {
    const svg = d3.select("#barChart");

    function updateBarChart() {
      const value = parseInt(d3.select("#rectangleCount").property("value"));
      d3.select("#rectangleCountValue").text(value);

      const data = Array.from({ length: barCount }, (_, i) => i + 1);

      const availableWidth = 200;
      const availableHeight = 300;
      const margin = 5;
      const maxBarsPerRow = Math.min(maxBarsPerColumn, barCount);
      const numRows = Math.ceil(barCount / maxBarsPerRow);
      const barWidth = (availableWidth - (maxBarsPerRow - 1) * margin) / maxBarsPerRow;
      const barHeight = (availableHeight - (numRows - 1) * margin) / numRows;

      const bars = svg.selectAll(".bar").data(data);

      bars.enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d, i) => (i % maxBarsPerRow) * (barWidth + margin))
        .attr("y", (d, i) => (numRows - Math.floor(i / maxBarsPerRow) - 1) * (barHeight + margin))
        .attr("width", barWidth)
        .attr("height", barHeight)
        .style("fill", d => getRandomColor());

      bars.exit().remove();

      bars
        .attr("x", (d, i) => (i % maxBarsPerRow) * (barWidth + margin))
        .attr("y", (d, i) => (numRows - Math.floor(i / maxBarsPerRow) - 1) * (barHeight + margin))
        .attr("width", barWidth)
        .attr("height", barHeight);
    }

    updateBarChart();

    d3.select("#rectangleCount").on("input", updateBarChart);
  }, [barCount]);

  const handleSliderChange = event => {
    const value = parseInt(event.target.value);
    setBarCount(value);
  };

  return (
    <div>
      <div id="sliderContainer">
        <label htmlFor="rectangleCount">Number of Bars:</label>
        <input
          type="range"
          id="rectangleCount"
          min="10"
          max="200"
          step="1"
          value={barCount}
          onChange={handleSliderChange}
        />
        <span id="rectangleCountValue">{barCount}</span>
        <div className="slider-labels">
          <span>10</span>
          <span>50</span>
          <span>100</span>
          <span>150</span>
          <span>200</span>
        </div>
      </div>
      <div
        style={{
          border: "1px solid black",
          width: "600px",
          height: "600px",
          margin: "10rem",
          transform: "rotate(90deg)",
        }}
      >
        <svg id="barChart" width="600" height="300">
          <g className="bars"></g>
        </svg>
      </div>
    </div>
  );
};

export default RotatedBarChart;
