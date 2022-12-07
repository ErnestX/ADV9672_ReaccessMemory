import { Mountain } from "./mountain.js";
import { AppState } from "./appState.js";

export class World {
  constructor(numOfMountains) {
    this.width = 1500;
    this.height = 1200;
    this.mountains = [];

    var basePoints = [[50, 50], [50, 450], [500,500], [500, 950], [900, 800], [850, 500], [450, 200], [450, 50]];
    for (let i = 0; i < numOfMountains; i++) {
      this.mountains.push(new Mountain(this, basePoints, 7, i.toString()));
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
}