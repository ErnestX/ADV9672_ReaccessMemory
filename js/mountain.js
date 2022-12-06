import { rgb, twoLevelCopyArr } from "./utilities.js";
import { Episode } from "./episode.js";

export class Mountain {
  constructor(w, bps, esCount){
    this.world = w;
    this.basePoints = bps;
    this.maxPoints = twoLevelCopyArr(this.basePoints).map((coord) => [coord[0] * 1.2, coord[1] * 1.2]);;
    this.episodes = [];

    var basePointsAverage = [0, 0];
    for (let i = 0; i < this.basePoints.length; i++) {
      basePointsAverage[0] += this.basePoints[i][0];
      basePointsAverage[1] += this.basePoints[i][1];
    }
    basePointsAverage[0] /= this.basePoints.length;
    basePointsAverage[1] /= this.basePoints.length;

    var currentPoints = twoLevelCopyArr(this.basePoints);

    // init episodes
    for (let e = 0; e < esCount; e++) {
      for (let i = 0; i < currentPoints.length; i++) {
        currentPoints[i][0] += (basePointsAverage[0] - currentPoints[i][0]) / esCount;
        currentPoints[i][1] += (basePointsAverage[1] - currentPoints[i][1]) / esCount;
      }
      var lc = 175 + 80 / esCount * e;
      var lineColor = rgb(lc, lc, lc);
      var lineWidth = 1.2 + 0.6 / esCount * e;
      var eId = "episode".concat(e.toString());

      this.episodes.push(new Episode(this, lineWidth, lineColor, twoLevelCopyArr(currentPoints), eId));
    }
  }

    render(svg) {
      for (let i = 0; i < this.episodes.length; i++) {
            this.episodes[i].render(svg);
        }
    }
}