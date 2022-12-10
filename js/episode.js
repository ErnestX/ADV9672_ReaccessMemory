import { rgb, twoLevelCopyArr, uuidv4, blendColors, arePointsEqual } from "./utilities.js";

export class Episode {
  constructor(w, m, lw, lc, pts, selScale, selTrans, id) {
    this.world = w;
    this.mountains = m;
    this.lineWeight = lw;
    this.lineColor = lc;
    this.points = pts;
    this.selectionScale = selScale; 
    this.selectionTranslation = selTrans;
    this.identity = id;
    this.isSelected = false;

    this.contourCurve = d3.line().curve(d3.curveBasisClosed);
  }

  static combineEpisodes(eps1, eps2) {
    let eps1Points = twoLevelCopyArr(eps1.points);
    let eps2Points = twoLevelCopyArr(eps2.points);

    let minDistance = Infinity;
    let p1ForMinDist = [];
    let p2ForMinDist = [];
    for (let i = 0; i < eps1Points.length; i++) {
      for (let j = 0; j < eps2Points.length; j++) {
        let p1 = eps1Points[i];
        let p2 = eps2Points[j];
        let distance = Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
        if (distance < minDistance) {
          minDistance = distance;
          p1ForMinDist = p1;
          p2ForMinDist = p2;
        }
      }
    }

    // Step1:  move p1 to the end of points1, and p2 to the beginning of points2
    while (!arePointsEqual(eps1Points[eps1Points.length-1], p1ForMinDist)) {
      let p = eps1Points.shift();
      eps1Points.push(p);
    }
    while (!arePointsEqual(eps2Points[0], p2ForMinDist)) {
      let p = eps2Points.shift();
      eps2Points.push(p);
    }

    // Step2: remove p1 and p2. this makes the connection wider
    //eps1Points.pop();
    //eps2Points.shift();

    // Step3: concat
    let combinedPoints = eps1Points.concat(eps2Points);
    
    console.log("combined points: ");
    console.log(combinedPoints);

    return new Episode(eps1.world, 
      [...new Set(eps1.mountains.concat(eps2.mountains))], 
      (eps1.lineWeight + eps2.lineWeight)/2.0, 
      blendColors(eps1.lineColor, eps2.lineColor, 0.5), 
      combinedPoints, 
      2, 
      [10,20],
      "episode".concat(uuidv4())); // fix: max points
  }

  render(svg) {
    let thisObj = this;
    svg
    .append('path')
    .attr("id", thisObj.identity)
    .attr('d', thisObj.contourCurve(thisObj.points))
    .attr("stroke-linejoin", "round")
    .attr("fill", "black")
    .attr("stroke", thisObj.lineColor)
    .attr("stroke-width", thisObj.lineWeight)
    .on("click", function () {
      thisObj.world.selectEpisode(thisObj);
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

  animateSelectionContext(scale, translation) {
    let thisObj = this;
    
    d3
    .select('path#'.concat(thisObj.identity))
    .transition()
    .duration(2000)
    .attr("stroke-width", 1 / scale)
    .attr('transform', function(d, i) {
      return "translate(" + translation[0] + "," + translation[1] + ") scale(" + scale + ")";
    }); 
  }
  
  animateSelection() {
    this.isSelected = true;
    let thisObj = this;
    
    d3
    .select('path#'.concat(thisObj.identity))
    .transition()
    .duration(2000)
    .attr("stroke-width", 3)
    .attr("stroke", rgb(255, 255, 255))
    .attr('transform', function(d, i) {
      return "translate(" + thisObj.selectionTranslation[0] + "," + thisObj.selectionTranslation[1] + ") scale(" + thisObj.selectionScale + ")";
    });
  }

  // animateUnselected() {
  //   //this.isSelected = false;
  //   let thisObj = this;
  //   d3
  //     .select('path#'.concat(thisObj.identity))
  //     .transition()
  //     .duration(2000)
  //     .attr("stroke-width", thisObj.lineWeight)
  //     .attr("stroke", thisObj.lineColor)
  //     .attr('transform', function(d, i) {
  //       return "translate(0,0) scale(1)";
  //     })
  //     .on("end", thisObj.isSelected = false);
  // }

  // animateDismissed() {
  //   d3
  //   .select('path#'.concat(this.identity))
  //   .transition()
  //   .duration(1500)
  //   .style('opacity', 0.0);
  // }

  // animateUndismissed() {
  //   d3
  //   .select('path#'.concat(this.identity))
  //   .transition()
  //   .duration(1500)
  //   .style('opacity', 1.0);
  // }

  mountainLabels() {
    let output = [];
    for (let i = 0; i < this.mountains.length; i++) {
      output.push(this.mountains[i].label);
    }
    return output;
  }
}