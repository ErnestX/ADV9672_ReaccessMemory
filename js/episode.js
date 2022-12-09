import { rgb, twoLevelCopyArr } from "./utilities.js";

export class Episode {
  constructor(w, m, lw, lc, pts, maxPts, id) {
    this.world = w;
    this.mountains = m;
    this.lineWeight = lw;
    this.lineColor = lc;
    this.points = pts;
    this.maxPoints = maxPts;
    this.identity = id;
    this.isSelected = false;

    this.contourCurve = d3.line().curve(d3.curveBasisClosed);
  }

  static combineEpisodes(eps1, eps2) {
    // let eps1Points = twoLevelCopyArr(eps1.points);
    // let eps2Points = twoLevelCopyArr(eps2.points);

    // let eps1PointsLength = eps1Points.length;
    // let insertPoint = Math.floor(eps1PointsLength / 2);
    
    // let combinedPoints = eps1Points.splice(insertPoint, 0, eps2Points);

    // return new Episode(eps1.mountains.concat(eps2.mountains), eps1.lineWeight, eps1.lineColor, combinedPoints, combinedPoints, eps1.mountains[0].label.concat("episode".concat(uuidv4()))); // fix: max points
  }

  render(svg) {
    let thisObj = this;
    svg
    .append('path')
    .attr("id", thisObj.identity)
    .attr('d', this.contourCurve(this.points))
    .attr("stroke-linejoin", "round")
    .attr("fill", "black")
    .attr("stroke", this.lineColor)
    .attr("stroke-width", this.lineWeight)
    .on("click", function () {
      thisObj.world.selectEpisode(thisObj.identity);
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
      thisObj.world.combineEpisodeAtMtns(thisObj.identity, thisObj.mountainLabels());
    })
    .on("mouseup", function() {
      thisObj.world.combineWithEpisodeAtMtns(thisObj.identity, thisObj.mountainLabels());
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

  mountainLabels() {
    let output = [];
    for (let i = 0; i < this.mountains.length; i++) {
      output.push(this.mountains[i].label);
    }
    return output;
  }
}