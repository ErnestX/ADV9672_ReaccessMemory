
import { Mountain } from "./mountain.js";

export class World {
  constructor(numOfMountains) {
    this.width = 1500;
    this.height = 1200;
    this.mountains = [];

    var basePoints = [[50, 50], [50, 450], [500,500], [500, 950], [900, 800], [850, 500], [450, 200], [450, 50]];
    for (let i = 0; i < numOfMountains; i++) {
      this.mountains.push(new Mountain(this, basePoints, 7));
    }
  }

  render(svg) {
    for (let i = 0; i < this.mountains.length; i++) {
      this.mountains[i].render(svg);
    }
  }

  selectEpisode(eId) {
    for (let i = 0; i < this.mountains.length; i++) {
      this.mountains[i].animateSelection(eId);
    }
  }
}