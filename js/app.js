import { MemoryContours, Unselect } from "./contour.js";

MemoryContours();
// function equalToEventTarget() {
//   return this == d3.event.target;
// }
// var allSvgs = d3.selectAll("#SvgContour *");
// d3.select("body").on("click",function(){
//   var clickedOutside = allSvgs.filter(equalToEventTarget).empty();
//   if (clickedOutside) {
//        Unselect();
//   }
// });

document.onkeydown = function(){console.log("key down"); Unselect();};