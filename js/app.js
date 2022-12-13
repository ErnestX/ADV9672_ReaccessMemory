import { AppState } from "./appState.js";
import { World } from "./world.js";

AppState.width = 800;
AppState.height = 600;

document.getElementById('SvgContour').style.width = AppState.width.toString().concat("px");
document.getElementById('SvgContour').style.height = AppState.height.toString().concat("px");

const world = new World(AppState.width, AppState.height, AppState.numOfMountainsToGenerate);
world.render();

document.addEventListener("keydown", function(event) {
  const key = event.key; // Or const {key} = event; in ES6+
  switch (key) {
    case "Escape":
      world.unselect(); 
      AppState.textBuffer = "";
      break;
    case "Enter":
      AppState.selectedEpisode.text = AppState.textBuffer;
      AppState.selectedEpisode.refreshText();
      AppState.textBuffer = "";
      break;
    case "Shift":
      break;
    default:
      AppState.textBuffer = AppState.textBuffer.concat(key);
      console.log("other key pressed");
      console.log(AppState.textBuffer);
  }
});
