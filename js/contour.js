import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7";
// const div = d3.selectAll("div");

export function Hello() {
  alert('Hello, World! 222222222222222222222');
}

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/density-contours

export function DensityContours(data, {
  x = ([x]) => x, // given d in data, returns the (quantitative) x-value
  y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
  xLabel, // a label for the x-axis
  yLabel, // a label for the y-axis
  bandwidth = 30, // the bandwidth for contouring (in pixels)
  thresholds = 30, // requested number of contours
  fill = "none", // the fill color (either a constant or a function of the density)
  stroke = typeof fill === "function" ? null : "currentcolor", // stroke color (either a constant or a function of the density)
  strokeWidth = (d, i) => i % 5 ? 0.25 : 1, // stroke width as a function of the density
  marginTop = 20, // top margin, in pixels
  marginRight = 30, // right margin, in pixels
  marginBottom = 30, // bottom margin, in pixels
  marginLeft = 40, // left margin, in pixels
  width = 640, // outer width, in pixels
  height = 400, // outer height, in pixels
  xDomain, // [xmin, xmax]
  xRange = [marginLeft, width - marginRight], // [left, right]
  yDomain, // [ymin, ymax]
  yRange = [height - marginBottom, marginTop] // [bottom, top]
} = {}) {
  // Compute values.
  const X = d3.map(data, x);
  const Y = d3.map(data, y);
  const I = d3.range(data.length);

  const svg = d3.select("#svgcontainer2")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  if (xDomain === undefined) xDomain = d3.extent(X);
  if (yDomain === undefined) yDomain = d3.extent(Y);

  const xScale = d3.scaleLinear()
    .domain(xDomain).nice()
    .rangeRound(xRange);

  const yScale = d3.scaleLinear()
    .domain(yDomain).nice()
    .rangeRound(yRange);

  const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);

  const yAxis = d3.axisLeft(yScale).tickSizeOuter(0);

  const contours = d3.contourDensity()
    .x(i => xScale(X[i]))
    .y(i => yScale(Y[i]))
    .size([width, height])
    .bandwidth(bandwidth)
    .thresholds(thresholds)
    (I);

  svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(xAxis)
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
      .attr("y", -3)
      .attr("dy", null)
      .attr("font-weight", "bold")
      .text(xLabel));

  svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(yAxis)
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
      .attr("x", 3)
      .attr("text-anchor", "start")
      .attr("font-weight", "bold")
      .text(yLabel));

  svg.append("g")
    .attr("stroke-linejoin", "round")
    .attr("fill", typeof fill === "function" ? null : fill)
    .attr("stroke", typeof stroke === "function" ? null : stroke)
    .attr("stroke-width", typeof strokeWidth === "function" ? null : strokeWidth)
    .selectAll("path")
    .data(contours)
    .join("path")
    .attr("fill", typeof fill === "function" ? d => fill(d.value) : null)
    .attr("stroke", typeof stroke === "function" ? d => stroke(d.value) : null)
    .attr("stroke-width", typeof strokeWidth === "function" ? (d, i) => strokeWidth(d.value, i) : null)
    .attr("d", d3.geoPath());

  svg.append("g")
    .attr("stroke", "white")
    .selectAll("circle")
    .data(I)
    .join("circle")
    .attr("cx", i => xScale(X[i]))
    .attr("cy", i => yScale(Y[i]))
    .attr("r", 2);

  // return svg.node();
}