import { DensityContours } from "./contour.js";
import { MemoryContours } from "./contour.js";

var eruptions = [{x: 79, y: 3.6}, {x: 54, y: 1.8}, {x: 74, y: 3.333}, {x: 62, y: 2.283}, {x: 85, y: 4.533}, {x: 55, y: 2.883}, {x: 88, y: 4.7}, {x: 85, y: 3.6}, {x: 51, y: 1.95}, {x: 85, y: 4.35}, {x: 54, y: 1.833}, {x: 84, y: 3.917}, {x: 78, y: 4.2}, {x: 47, y: 1.75}, {x: 83, y: 4.7}, {x: 52, y: 2.167}, {x: 62, y: 1.75}, {x: 84, y: 4.8}, {x: 52, y: 1.6}, {x: 79, y: 4.25}];

MemoryContours();

// $('#testing').on('click',function(){ alert("Hello! I am an alert box!!"); });

DensityContours(eruptions, {
  x: d => d.x,
  y: d => d.y,
  xLabel: "Idle (min.) ",
  yLabel: "Erupting (min.)",
  width: 600,
  height: 600,
  stroke: "steelblue",
  fill: "white"
})
