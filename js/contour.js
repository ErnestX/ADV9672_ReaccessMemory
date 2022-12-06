// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/density-contours


export function MemoryContours() {
  var width = 1000;
  var height = 1000;
  var basePoints = [[50, 50], [50, 450], [500,500], [500, 950], [900, 800], [850, 500], [450, 200], [450, 50]];

  const svg = d3.select("#SvgContour")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [0, 0, width, height])
  .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  const curve = d3.line().curve(d3.curveBasisClosed);

  var basePointsAverage = [0,0];
  for (let i = 0; i < basePoints.length; i++) {
    basePointsAverage[0] += basePoints[i][0];
    basePointsAverage[1] += basePoints[i][1];
  }
  basePointsAverage[0] /= basePoints.length;
  basePointsAverage[1] /= basePoints.length;
  console.log(basePointsAverage);

  var numOfEpisodes = 7;
  var currentPoints = basePoints;
  for (let e = 0; e < numOfEpisodes; e++) {
    for (let i = 0; i < currentPoints.length; i++) {
      currentPoints[i][0] += (basePointsAverage[0] - currentPoints[i][0]) / numOfEpisodes;
      currentPoints[i][1] += (basePointsAverage[1] - currentPoints[i][1]) / numOfEpisodes;
    }
    var lc = 175 + 80 / numOfEpisodes * e;
    var lineColor = rgb(lc,lc,lc);
    var lineWidth = 1.2 + 0.6 / numOfEpisodes * e;
    svg
    .append('path')
    .attr("id", e.toString())
    .on("click", function(){
      alert("Clicked on contour #".concat(e.toString()));
    })
    .attr('d', curve(currentPoints))
    .attr("stroke-linejoin", "round")
    .attr("fill", "black")
    .attr("stroke", lineColor)
    .attr("stroke-width", lineWidth);
    // .transition()
    // .duration(5000)
    // .attrTween('d',function(){
    //   var interpolator = d3.interpolate(currentPoints,basePoints)
    //   return function(t){
    //     console.log(curve(interpolator(t))); 
    //     return curve(interpolator(t))
    //   };}); 
    //.attr('d', curve(basePoints)); 
    // .attr("transform","scale(2)")
    // .attr("stroke-width", lineWidth/2);
  }

  // d3
  // .select('path#3')
  // .transition().attr("d", curve);
}

function rgb(r, g, b){
  return ["rgb(",r,",",g,",",b,")"].join("");
}