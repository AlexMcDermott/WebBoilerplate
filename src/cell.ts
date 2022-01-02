import * as PIXI from 'pixi.js';

export default class Cell {
  private x: number;
  private y: number;
  private size: number;
  private colour: number;

  constructor(x: number, y: number, size: number, colour: number) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.colour = colour;
  }

  public draw(gph: PIXI.Graphics): void {
    gph.beginFill(this.colour);
    gph.drawRect(this.x, this.y, this.size, this.size);
  }
}
