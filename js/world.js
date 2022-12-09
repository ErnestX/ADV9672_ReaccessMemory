import { uuidv4, mapRange } from "./utilities.js";
import { Mountain } from "./mountain.js";
import { AppState } from "./appState.js";
import {Delaunay} from "https://cdn.skypack.dev/d3-delaunay@6";

export class World {
  constructor(w, h, numOfMountains) {
    this.episodeToCombine = "";
    this.mtnsOfEpisodeToCombine = "";

    this.width = w;
    this.height = h;
    this.mountains = [];

    let padding = Math.max(this.width, this.height) / 4;
    let mountainBasePoints = [];
    for (let i = 0; i < numOfMountains; i++) {
      let x = mapRange(Math.random(), 0.0, 1.0, padding, this.width-padding);
      let y = mapRange(Math.random(), 0.0, 1.0, padding, this.height-padding);
      mountainBasePoints.push([x, y]);
    }
    console.log("Mountain base points: ");
    console.log(mountainBasePoints);
    let voronoiDiagram = Delaunay.from(mountainBasePoints)
    .voronoi([0, 0, this.width, this.height]);

    for (let i = 0; i < numOfMountains; i++) {
      let polygonVertexes = voronoiDiagram.cellPolygon(i);
      polygonVertexes.pop(); // the last point repeats the first point
      this.mountains.push(new Mountain(this, polygonVertexes, 5, "mtn".concat(uuidv4())));
    }
  }

  render() {
    d3.select("svg").remove();
    const svg = d3.select("#SvgContour")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .attr("viewBox", [0, 0, this.width, this.height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    for (let i = 0; i < this.mountains.length; i++) {
      this.mountains[i].render(svg);
    }
  }

  selectEpisode(eId) {
    if (AppState.state !== 0) {
      return;
    }
    AppState.state = 1;
    for (let i = 0; i < this.mountains.length; i++) {
      this.mountains[i].animateSelecting(eId);
    }
  }

  unselect() {
    if (AppState.state !== 1) {
      return;
    }
    AppState.state = 0;
    for (let i = 0; i < this.mountains.length; i++) {
      this.mountains[i].animateUnselecting();
    }
  }

  combineEpisodeAtMtns(eId, mLbs) {
    console.log("combine at mountain: ");
    console.log(mLbs);
    this.episodeToCombine = eId;
    this.mtnsOfEpisodeToCombine = mLbs;
  }

  combineWithEpisodeAtMtns(eId, mLbs) {
    console.log("combine with at mountain: ");
    console.log(mLbs);
    // must be on different mountains! 
    for (let i = 0; i < this.mtnsOfEpisodeToCombine.length; i++) {
      for (let j = 0; j < mLbs.length; j++) {
        if (this.mtnsOfEpisodeToCombine[i] === mLbs[j]) {
          return;
        }
      }
    }
    Mountain.combineEpisodes(this.getMountains(this.mtnsOfEpisodeToCombine), this.getMountains(mLbs), this.episodeToCombine, eId);
    this.render();
  }

  getMountains(mLbs) {
    let output = []
    for (let i = 0; i < mLbs.length; i++) {
      output.push(this.getMountain(mLbs[i]));
    }
    return output;
  }

  getMountain(mLb) {
    for (let i = 0; i < this.mountains.length; i++){
      if (this.mountains[i].label === mLb) {
        return this.mountains[i];
      }
    }
    return null;
  }
}