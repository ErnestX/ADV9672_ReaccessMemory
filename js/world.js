import { Mountain } from "./mountain.js";
import { AppState } from "./appState.js";

export class World {
  constructor(numOfMountains) {
    this.width = 1500;
    this.height = 1200;
    this.mountains = [];

    var basePoints1 = [[50, 50], [50, 450], [450, 300], [600, 50]];
    var basePoints2 = [[150,500], [300, 750], [700, 700], [750, 200]];

    this.mountains.push(new Mountain(this, basePoints1, 4, "A"));
    this.mountains.push(new Mountain(this, basePoints2, 6, "B"));
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