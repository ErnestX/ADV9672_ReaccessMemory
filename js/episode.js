import { rgb, twoLevelCopyArr } from "./utilities.js";

export class Episode {
  constructor(m, lw, lc, pts, maxPts, id) {
    this.mountain = m;
    this.lineWeight = lw;
    this.lineColor = lc;
    this.points = pts;
    this.maxPoints = maxPts;
    this.identity = id;
    this.isSelected = false;

    this.contourCurve = d3.line().curve(d3.curveBasisClosed);
  }

  render(svg) {
    var thisObj = this;
    svg
    .append('path')
    .attr("id", thisObj.identity)
    .attr('d', this.contourCurve(this.points))
    .attr("stroke-linejoin", "round")
    .attr("fill", "black")
    .attr("stroke", this.lineColor)
    .attr("stroke-width", this.lineWeight)
    .on("click", function () {
      thisObj.mountain.selectEpisode(thisObj.identity);
    })
    .on("mouseover", function() {
      d3
      .select('path#'.concat(thisObj.identity))
      .attr("fill", "grey");
    })
    .on("mouseout", function() {
      d3
      .select('path#'.concat(thisObj.identity))
      .attr("fill", "black");
    })
    .on("mousedown", function() {
      thisObj.mountain.combineEpisode(thisObj.identity);
    })
    .on("mouseup", function() {
      thisObj.mountain.combineWithEpisode(thisObj.identity);
    });
  }

  animateSelected() {
    this.isSelected = true;
    d3
    .select('path#'.concat(this.identity))
    .transition()
    .duration(2000)
    .attr("stroke-width", 1)
    .attr("stroke", rgb(255, 255, 255))
    .attr('d', this.contourCurve(this.maxPoints));
  }

  animateUnselected() {
    this.isSelected = false;
    d3
      .select('path#'.concat(this.identity))
      .transition()
      .duration(2000)
      .attr("stroke-width", this.lineWeight)
      .attr("stroke", this.lineColor)
      .attr('d', this.contourCurve(this.points));
  }

  animateDismissed() {
    //console.log("Dismissed: ".concat(this.identity));
    d3
    .select('path#'.concat(this.identity))
    .transition()
    .duration(1500)
    .style('opacity', 0.0);
  }

  animateUndismissed() {
    //console.log("Undismissed: ".concat(this.identity));
    d3
    .select('path#'.concat(this.identity))
    .transition()
    .duration(1500)
    .style('opacity', 1.0);
  }
}