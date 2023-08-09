import React, { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';

const RectangleStack = ({ barCount }) => {
  const svgRef = useRef(null);

  // Array of colors to choose from
  const colors = ['#FF5733', '#FFC300', '#FF1493', 'black', '#0074D9'];

  // Function to generate random colors
  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  // Use useCallback for the updateChart function
  const updateChart = useCallback(() => {
    const svg = d3.select(svgRef.current);

    // Calculate the number of rows and columns in the grid
    const maxRows = 10; // Set a maximum number of rows to control the chart size
    const numRows = Math.min(barCount, maxRows);
    const numCols = Math.ceil(barCount / numRows);

    // Calculate the width and height of each cell based on the total space available
    const availableWidth = 600; // Total available width in SVG container
    const availableHeight = 300; // Total available height in SVG container
    const groupMargin = 20; // Margin between groups
    const cellMargin = 5; // Margin between cells
    const cellWidth = (availableWidth - (numCols - 1) * cellMargin) / numCols;
    const cellHeight = (availableHeight - (numRows - 1) * cellMargin) / numRows;

    // Generate data for the bars (each data item will represent multiple rectangles in a cell)
    const data = Array.from({ length: numRows }, (_, i) =>
      Array.from({ length: numCols }, (_, j) => i * numCols + j + 1)
    );

    // Create a group for each cell
    const cellGroups = svg
      .selectAll('.cell-group')
      .data(data.flat())
      .enter()
      .append('g')
      .attr('class', 'cell-group')
      .attr('transform', (d, i) => `translate(${(i % numCols) * (cellWidth + cellMargin)}, ${Math.floor(i / numCols) * (cellHeight + cellMargin)})`);

    // Add multiple rectangles in each cell
    const rects = cellGroups
      .selectAll('.bar')
      .data(d => Array.from({ length: 3 }, () => d)) // Each cell will contain 3 rectangles (you can change the number as per your requirement)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => i * 10) // Adjust the spacing between rectangles
      .attr('y', (d, i) => i * 10) // Adjust the vertical spacing between rectangles
      .attr('width', 8) // Rectangle width
      .attr('height', 8) // Rectangle height
      .style('fill', d => getRandomColor());

    // Remove unnecessary cells
    cellGroups.exit().remove();

    // Update grid size and rectangles if barCount changes
    cellGroups.attr('transform', (d, i) => `translate(${(i % numCols) * (cellWidth + cellMargin)}, ${Math.floor(i / numCols) * (cellHeight + cellMargin)})`);
    rects.attr('x', (d, i) => i * 10).attr('y', (d, i) => i * 10).style('fill', d => getRandomColor());
  }, [barCount]);

  useEffect(() => {
    updateChart();
  }, [updateChart]);

  return (
    <svg ref={svgRef} width="600" height="300">
      {/* SVG content will be rendered here */}
    </svg>
  );
};

export default RectangleStack;
