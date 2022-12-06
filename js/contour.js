import { rgb, twoLevelCopyArr } from "./utilities.js";

var width = 1500;
var height = 1200;
var basePoints = [[50, 50], [50, 450], [500,500], [500, 950], [900, 800], [850, 500], [450, 200], [450, 50]];
var maxPoints = [[50, 50], [50, 450], [500,500], [500, 950], [900, 800], [850, 500], [450, 200], [450, 50]].map((coord) => [coord[0] * 1.2, coord[1] * 1.2]);
const curve = d3.line().curve(d3.curveBasisClosed);
var episodeIds = [];
var episodePoints = [];
var episodeLineWeights = [];
var episodeLineColors = [];

var selectedId = "";

export function CreateContours() {
  const svg = d3.select("#SvgContour")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [0, 0, width, height])
  .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  var basePointsAverage = [0,0];
  for (let i = 0; i < basePoints.length; i++) {
    basePointsAverage[0] += basePoints[i][0];
    basePointsAverage[1] += basePoints[i][1];
  }
  basePointsAverage[0] /= basePoints.length;
  basePointsAverage[1] /= basePoints.length;
  console.log(basePointsAverage);

  var numOfEpisodes = 5;
  var currentPoints = twoLevelCopyArr(basePoints);
  for (let e = 0; e < numOfEpisodes; e++) {
    for (let i = 0; i < currentPoints.length; i++) {
      currentPoints[i][0] += (basePointsAverage[0] - currentPoints[i][0]) / numOfEpisodes;
      currentPoints[i][1] += (basePointsAverage[1] - currentPoints[i][1]) / numOfEpisodes;
    }
    var lc = 175 + 80 / numOfEpisodes * e;
    var lineColor = rgb(lc,lc,lc);
    var lineWidth = 1.2 + 0.6 / numOfEpisodes * e;
    var eId = "episode".concat(e.toString());
    
    episodeIds.push(eId);
    episodePoints.push(twoLevelCopyArr(currentPoints));
    episodeLineWeights.push(lineWidth);
    episodeLineColors.push(lineColor);

    svg
    .append('path')
    .attr("id", eId)
    .on("click", function(){
      console.log("Clicked on contour #".concat(e.toString()));
      animateSelection(this.id);
      selectedId = this.id;
    })
    .attr('d', curve(currentPoints))
    .attr("stroke-linejoin", "round")
    .attr("fill", "black")
    .attr("stroke", lineColor)
    .attr("stroke-width", lineWidth);
  }
}

function animateSelection(episodeId) {
  console.log("animating selected id: ".concat(episodeId));
  d3
  .select('path#'.concat(episodeId))
  .transition()
  .duration(2000)
  .attr("stroke-width", 1)
  .attr("stroke", rgb(255, 255, 255))
  .attr('d', curve(maxPoints));

  for (let i = 0; i < episodeIds.length; i++){
    if (episodeIds[i] !== episodeId) {
        animateDismissed(episodeIds[i]);
    }
  }
}

export function Unselect() {
  if (selectedId === "") {
    return;
  }
  var episodeId = selectedId;
  for (let i = 0; i < episodeIds.length; i++){
    if (episodeIds[i] !== episodeId) {
      animateUndismissing(episodeIds[i]);
    } else {
      d3
      .select('path#'.concat(episodeId))
      .transition()
      .duration(2000)
      .attr("stroke-width", episodeLineWeights[i])
      .attr("stroke", episodeLineColors[i])
      .attr('d', curve(episodePoints[i]));
    }
  }
}

function animateDismissed(episodeId) {
  console.log("animating unselected id: ".concat(episodeId));
  d3
  .select('path#'.concat(episodeId))
  .transition()
  .duration(1500)
  .style('opacity', 0.0);
}

function animateUndismissing(episodeId) {
  d3
  .select('path#'.concat(episodeId))
  .transition()
  .duration(1500)
  .style('opacity', 1.0);
}
