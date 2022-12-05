//import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7";
import { Hello } from "./contour.js";
import { DensityContours } from "./contour.js";

alert('Hello, World! 111111111111111');

Hello();

var width = 500;
var height = 500;

//Create SVG element
var svg = d3.select("#svgcontainer")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

//Append circle 
svg.append("circle")
  .attr("cx", 200)
  .attr("cy", 50)
  .attr("r", 20)
  .attr("fill", "green");


//eruptions = d3.FileAttachment("faithful.tsv").tsv({typed: true})
//eruptions = Object.assign(d3.tsvParse(await FileAttachment("faithful.tsv").text(), ({waiting: x, eruptions: y}) => ({x: +x, y: +y})), {x: "Idle (min.)", y: "Erupting (min.)"})


chart = DensityContours(eruptions, {
  x: d => d.waiting,
  y: d => d.eruptions,
  xLabel: "Idle (min.) ",
  yLabel: "Erupting (min.)",
  width,
  height: 600,
  stroke: "steelblue"
})

// return chart;

// print(chart)

// chart = {
//   const svg = d3.create("svg")
//       .attr("viewBox", [0, 0, width, height]);
  
//   svg.append("g")
//       .call(xAxis);
  
//   svg.append("g")
//       .call(yAxis);
  
//   svg.append("g")
//       .attr("fill", "none")
//       .attr("stroke", "steelblue")
//       .attr("stroke-linejoin", "round")
//     .selectAll("path")
//     .data(contours)
//     .join("path")
//       .attr("stroke-width", (d, i) => i % 5 ? 0.25 : 1)
//       .attr("d", d3.geoPath());
  
//   svg.append("g")
//       .attr("stroke", "white")
//     .selectAll("circle")
//     .data(data)
//     .join("circle")
//       .attr("cx", d => x(d.x))
//       .attr("cy", d => y(d.y))
//       .attr("r", 2);
  
//   return svg.node();
// }


