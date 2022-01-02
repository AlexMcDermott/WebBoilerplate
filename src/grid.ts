import * as PIXI from 'pixi.js';
import Cell from './cell';

export default class Grid {
  private width: number;
  private height: number;
  private cellSize: number;
  private cellColour: number;
  private cells: Cell[];

  constructor(
    width: number,
    height: number,
    cellSize: number,
    cellColour: number
  ) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.cellColour = cellColour;
    this.generate();
  }

  private generate(): void {
    this.cells = new Array(this.width * this.height);
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.cells.push(
          new Cell(
            x * this.cellSize,
            y * this.cellSize,
            this.cellSize,
            this.cellColour
          )
        );
      }
    }
  }

  public draw(gph: PIXI.Graphics): void {
    this.cells.forEach(cell => cell.draw(gph));
  }
}
