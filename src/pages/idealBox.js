import { useState } from "react";
import RectangleStack from "../components/RectangleStack";
import BarChart from "../components/BarChart";

const IdealBox = () => {
  const [barCount, setBarCount] = useState(5);

  const handleSliderChange = (event) => {
    setBarCount(parseInt(event.target.value));
  };

  // Define the breakpoints and labels
  const breakpoints = [10, 100, 1000];
  const labels = ["10", "100", "1,000"];

  // Calculate the nearest breakpoint to the current barCount
  const nearestBreakpoint = breakpoints.reduce((prev, curr) =>
    Math.abs(curr - barCount) < Math.abs(prev - barCount) ? curr : prev
  );

  return (
    <div>
      <h1>Data Grid Bar Chart with React and D3.js</h1>
      <div className="chartContainer">
        {/* <RectangleStack barCount={barCount} breakpoints={breakpoints} /> */}
        <BarChart />
      </div>
      <div className="sliderContainer">
        {/* <label htmlFor="rectangleCount">Number of Bars:</label> */}
        <div className="sliderWrapper">
          {/* <input
            type="range"
            id="rectangleCount"
            min="10"
            max="100"
            step={nearestBreakpoint} // Use the nearest breakpoint as the step value
            value={barCount}
            onChange={handleSliderChange}
          /> */}
          {/* Labels with 45-degree rotation and vertical dashes */}
          {/* <svg width="100%" height="40">
            {breakpoints.map((d, index) => (
              <g key={index}>
                <line
                  x1={`${(d / 100000) * 100}%`}
                  y1="0"
                  x2={`${(d / 100000) * 100}%`}
                  y2="10"
                  stroke="black"
                  strokeDasharray="2,2"
                />
                <text
                  x={`${(d / 100000) * 100}%`}
                  y="20"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  transform={`rotate(-45 ${((d / 100000) * 100).toFixed(
                    1
                  )}, 20)`}
                >
                  {labels[index]}
                </text>
              </g>
            ))}
          </svg> */}
        </div>
        {/* <span id="rectangleCountValue">{barCount}</span> */}
      </div>
    </div>
  );
};

export default IdealBox;
