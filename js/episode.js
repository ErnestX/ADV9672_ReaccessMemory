import { rgb, twoLevelCopyArr } from "./utilities.js";

export class Episode {
  constructor(m, lw, lc, pts, maxPts, id) {
    this.mountain = m;
    this.lineWeight = lw;
    this.lineColor = lc;
    this.points = pts;
    this.maxPoints = maxPts;
    this.identity = id;

    this.contourCurve = d3.line().curve(d3.curveBasisClosed);
  }

  render(svg) {
    var mtn = this.mountain;
    svg
    .append('path')
    .attr("id", this.identity)
    .on("click", function () {
        mtn.selectEpisode(this.id);
        //selectedId = this.id;
    })
    .attr('d', this.contourCurve(this.points))
    .attr("stroke-linejoin", "round")
    .attr("fill", "black")
    .attr("stroke", this.lineColor)
    .attr("stroke-width", this.lineWeight);
  }

  animateSelected() {
    d3
    .select('path#'.concat(this.identity))
    .transition()
    .duration(2000)
    .attr("stroke-width", 1)
    .attr("stroke", rgb(255, 255, 255))
    .attr('d', this.contourCurve(this.maxPoints));
  }

  animateDismissed() {
    d3
    .select('path#'.concat(this.identity))
    .transition()
    .duration(1500)
    .style('opacity', 0.0);
  }
}