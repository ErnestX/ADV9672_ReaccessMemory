import { rgb, twoLevelCopyArr } from "./utilities.js";
import { Episode } from "./episode.js";

export class Mountain {
  constructor(w, bps, esCount, lbl){
    this.world = w;
    this.basePoints = bps;
    this.maxPoints = twoLevelCopyArr(this.basePoints).map((coord) => [coord[0] * 1.2, coord[1] * 1.2]);;
    this.label = lbl;
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
      var eId = "mtn".concat(this.label.concat("episode".concat(e.toString())));

      this.episodes.push(new Episode(this, lineWidth, lineColor, twoLevelCopyArr(currentPoints),this.maxPoints ,eId));
    }
  } 

  render(svg) {
    for (let i = 0; i < this.episodes.length; i++) {
      this.episodes[i].render(svg);
    }
  }

  selectEpisode(eId) {
    this.world.selectEpisode(eId);
  }

  animateUnselecting() {
    for (let i = 0; i < this.episodes.length; i++){
      if (this.episodes[i].isSelected) {
        this.episodes[i].animateUnselected();
      } else {
        this.episodes[i].animateUndismissed();
      }
    }
  }

  animateSelection(episodeId) {
    console.log("animating selected id: ".concat(episodeId));

    for (let i = 0; i < this.episodes.length; i++){
      if (this.episodes[i].identity !== episodeId) {
        this.episodes[i].animateDismissed();
      } else {
        this.episodes[i].animateSelected();
      }
    }
  }
}