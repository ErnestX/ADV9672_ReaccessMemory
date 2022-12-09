import { World } from "./world.js";

let width = 1500;
let height = 1200;

document.getElementById('SvgContour').style.width = width.toString().concat("px");
document.getElementById('SvgContour').style.height = height.toString().concat("px");

const world = new World(width, height, 5);
world.render();

document.onkeydown = function(){ 
  world.unselect(); 
};
