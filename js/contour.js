// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/density-contours


export function MemoryContours() {
  var width = 300;
  var height = 300;
  var points = [[50, 50], [50, 100], [150, 200], [100, 50]];
  var points2 = [[55, 50], [55, 100], [160, 100], [190, 80]];

  const svg = d3.select("#SvgContour")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [0, 0, width, height])
  .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  const curve = d3.line().curve(d3.curveBasisClosed);

  svg
  .append('path')
  .attr('d', curve(points))
  .attr("stroke-linejoin", "round")
  .attr("fill", "white")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 1)
  .selectAll("path")
  .join("path");

  svg
  .append('path')
  .attr('d', curve(points2))
  .attr("stroke-linejoin", "round")
  .attr("fill", "white")
  .attr("stroke", "red")
  .attr("stroke-width", 1)
  .selectAll("path")
  .join("path");
}

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

  console.log("creating contour");

  // Compute values.
  const X = d3.map(data, x);
  const Y = d3.map(data, y);
  const I = d3.range(data.length);

  const svg = d3.select("#SvgContour0")
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

  const contours = d3.contourDensity()
    .x(i => xScale(X[i]))
    .y(i => yScale(Y[i]))
    .size([width, height])
    .bandwidth(bandwidth)
    .thresholds(thresholds)
    (I);

console.log(contours);

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
}