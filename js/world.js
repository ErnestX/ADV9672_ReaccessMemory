import { uuidv4, mapRange } from "./utilities.js";
import { Mountain } from "./mountain.js";
import { AppState } from "./appState.js";
import {Delaunay} from "https://cdn.skypack.dev/d3-delaunay@6";

export class World {
  constructor(w, h, numOfMountains) {
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
    console.log(mountainBasePoints);
    let voronoiDiagram = Delaunay.from(mountainBasePoints)
    .voronoi([0, 0, this.width, this.height]);

    for (let i = 0; i < numOfMountains; i++) {
      let polygonVertexes = voronoiDiagram.cellPolygon(i);
      polygonVertexes.pop(); // the last point repeats the first point
      this.mountains.push(new Mountain(this, polygonVertexes, 5, "mtn".concat(uuidv4())));
    }
  }

  render(svg) {
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

  combineEpisodeAtMtn(eId, mLb) {
    console.log("Combining ".concat(eId));
    
  }

  combineWithEpisodeAtMtn(eId, mLb) {
    console.log("--> with ".concat(eId));
  }
}