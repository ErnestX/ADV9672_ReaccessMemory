import { AppState } from "./appState.js";
import { World } from "./world.js";

AppState.width = 1500;
AppState.height = 1200;

document.getElementById('SvgContour').style.width = AppState.width.toString().concat("px");
document.getElementById('SvgContour').style.height = AppState.height.toString().concat("px");

const world = new World(AppState.width, AppState.height, 5);
world.render();



document.onkeydown = function(){ 
  world.unselect(); 
};
