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

  totalEpisodesCountIncludingDuplicates(){
    let totalCount = 0;
    for (let i = 0; i < this.mountains.length; i++) {
      totalCount += this.mountains[i].episodes.length;
    }
    return totalCount;
  }

  render() {
    d3.select("svg").remove();
    const svg = d3.select("#SvgContour")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .attr("viewBox", [0, 0, this.width, this.height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    let didRenderAnEpisode = true;
    while (this.totalEpisodesCountIncludingDuplicates() > 0) {
      console.log(this.totalEpisodesCountIncludingDuplicates());
      didRenderAnEpisode = false;

      // Step1: render all episodes that belong to only one mountain
      // index advances only when the mountain has an episode rendered
      for (let i = 0; i < this.mountains.length; i++) {
        let eps = this.mountains[i].episodes[0]; // take the bottom episode
        if (typeof eps !== 'undefined' && eps.mountains.length < 2) {
          eps.render(svg);
          this.mountains[i].recoverableShiftEpisodes();
          didRenderAnEpisode = true;
        }
      }
      if (didRenderAnEpisode) {
        continue;
      }

      // Step2: if no episode is rendered, 
      // check if an episode is at the bottom of the rendering lists for all the mountains it belongs to. 
      // Render if true. 
      let epsIdsLeft = [];
      let epsesLeft = [];
      // create a list of all episodes left
      for (let i = 0; i < this.mountains.length; i++) {
        let eps = this.mountains[i].episodes[0]; // care only about the bottom episode
        if (typeof eps !== 'undefined') {
          let epsId = eps.identity;
          epsIdsLeft.push(epsId);
          epsesLeft.push(eps);
        }
      }
searchLoop:
      for (let i = 0; i < epsIdsLeft.length; i++) {
        let idToCheck = epsIdsLeft[i];
        let epsForTheId = epsesLeft[i]; // assumption: epsIdsLeft and epsesLeft corresponds to each other at the same index
        let count = 0;
        for (let j = 0; j < epsIdsLeft.length; j++) {
          if (idToCheck === epsIdsLeft[j]) {
            count++;
          }
        }
        if (epsForTheId.mountains.length <= count) {
          // The episode appears the same number of times as it has mountains, 
          // so all of the mountains this episode belongs to have it at the bottom of the rendering list! 
          // Render. 
          epsForTheId.render(svg);
          didRenderAnEpisode = true;
          // find the indexes for this episode in renderIndexes and advance them
          for (let m = 0; m < this.mountains.length; m++) {
            let e = this.mountains[m].episodes[0];
            if (typeof e !== 'undefined' && idToCheck === e.identity) {
              // just rendered this. remove the bottom episode
              this.mountains[m].recoverableShiftEpisodes();
            }
          }
        }
        break searchLoop; // didn't update epsIdsLeft, epsForTheId, etc., so this can be done only once
      } 
    } 
    for (let i = 0; i < this.mountains.length; i++) {
      this.mountains[i].recoverEpisodes(); // recover from pops and shifts
      console.log(this.mountains[i].episodes);
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