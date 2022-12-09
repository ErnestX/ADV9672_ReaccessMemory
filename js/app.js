import { World } from "./world.js";

let width = 1500;
let height = 1200;

document.getElementById('SvgContour').style.width = width.toString().concat("px");
document.getElementById('SvgContour').style.height = height.toString().concat("px");

// const svg = d3.select("#SvgContour")
// .append("svg")
// .attr("width", width)
// .attr("height", height)
// .attr("viewBox", [0, 0, width, height])
// .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

const world = new World(width, height, 5);
world.render();

document.onkeydown = function(){ 
  world.unselect(); 
};
