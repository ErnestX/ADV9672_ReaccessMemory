import { World } from "./world.js";

var width = 1500;
var height = 1200;
const svg = d3.select("#SvgContour")
.append("svg")
.attr("width", width)
.attr("height", height)
.attr("viewBox", [0, 0, width, height])
.attr("style", "max-width: 100%; height: auto; height: intrinsic;");

const world = new World(1);
world.render(svg);

document.onkeydown = function(){console.log("key down"); world.unselect();};
