import { rgb, twoLevelCopyArr, uuidv4 } from "./utilities.js";
import { Episode } from "./episode.js";

export class Mountain {
  constructor(w, bps, esCount, lbl){
    this.world = w;
    this.basePoints = bps;
    this.maxPoints = twoLevelCopyArr(this.basePoints).map((coord) => [coord[0] * 1.2, coord[1] * 1.2]);;
    this.label = lbl;
    this.episodes = [];

    let basePointsAverage = [0, 0];
    for (let i = 0; i < this.basePoints.length; i++) {
      basePointsAverage[0] += this.basePoints[i][0];
      basePointsAverage[1] += this.basePoints[i][1];
    }
    basePointsAverage[0] /= this.basePoints.length;
    basePointsAverage[1] /= this.basePoints.length;

    let currentPoints = twoLevelCopyArr(this.basePoints);

    // init episodes
    for (let e = 0; e < esCount; e++) {
      let lc = 175 + 80 / esCount * e;
      let lineColor = rgb(lc, lc, lc);
      let lineWidth = 1.2 + 0.6 / esCount * e;
      let eId = this.label.concat("episode".concat(uuidv4()));
      for (let i = 0; i < currentPoints.length; i++) {
        currentPoints[i][0] += (basePointsAverage[0] - currentPoints[i][0]) / esCount;
        currentPoints[i][1] += (basePointsAverage[1] - currentPoints[i][1]) / esCount;
      }

      this.episodes.push(new Episode(this.world, [this], lineWidth, lineColor, twoLevelCopyArr(currentPoints),this.maxPoints ,eId));
    }
  } 

  /// Assume the mountains are different
  static combineEpisodes(mtns1, mtns2, epsId1, epsId2) {
    // must be different episodes! 
    if (epsId1 !== epsId2) {
      let combinedEps = Episode.combineEpisodes(mtns1[0].getEpisode(epsId1), mtns2[0].getEpisode(epsId2));
      // replace with combinedEps at each mountain

    }
  }

  render(svg) {
    for (let i = 0; i < this.episodes.length; i++) {
      this.episodes[i].render(svg);
    }
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

  animateSelecting(episodeId) {
    //console.log("animating selected id: ".concat(episodeId));
    for (let i = 0; i < this.episodes.length; i++){
      if (this.episodes[i].identity !== episodeId) {
        this.episodes[i].animateDismissed();
      } else {
        this.episodes[i].animateSelected();
      }
    }
  }
  
  // selectEpisode(eId) {
  //   this.world.selectEpisode(eId);
  // }

  combineEpisode(eId){
    this.world.combineEpisodeAtMtn(eId, this.label);
  }

  combineWithEpisode(eId){
    this.world.combineWithEpisodeAtMtn(eId, this.label);
  }

  getEpisode(eId) {
    for (let i = 0; i < this.episodes.length; i++){
      if (this.episodes[i].identity === eId) {
        return this.episodes[i];
      }
    }
    return null;
  }
}