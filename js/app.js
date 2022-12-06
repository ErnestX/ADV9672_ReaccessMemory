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

var eruptions = [{x: 79, y: 3.6}, {x: 54, y: 1.8}, {x: 74, y: 3.333}, {x: 62, y: 2.283}, {x: 85, y: 4.533}, {x: 55, y: 2.883}, {x: 88, y: 4.7}, {x: 85, y: 3.6}, {x: 51, y: 1.95}, {x: 85, y: 4.35}, {x: 54, y: 1.833}, {x: 84, y: 3.917}, {x: 78, y: 4.2}, {x: 47, y: 1.75}, {x: 83, y: 4.7}, {x: 52, y: 2.167}, {x: 62, y: 1.75}, {x: 84, y: 4.8}, {x: 52, y: 1.6}, {x: 79, y: 4.25}];

DensityContours(eruptions, {
  x: d => d.x,//waiting,
  y: d => d.y,//eruptions,
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


