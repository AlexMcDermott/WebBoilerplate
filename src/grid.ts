import * as PIXI from 'pixi.js';
import { Cell, CellType } from './cell';

export default class Grid {
  private width: number;
  private height: number;
  private cellSize: number;
  private defaultCellType: CellType;
  private cells: Cell[];

  constructor(
    width: number,
    height: number,
    cellSize: number,
    defaultCellType: CellType
  ) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.defaultCellType = defaultCellType;
    this.generate();
  }

  private generate(): void {
    this.cells = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.cells.push(
          new Cell(
            x * this.cellSize,
            y * this.cellSize,
            this.cellSize,
            this.defaultCellType
          )
        );
      }
    }
  }

  public draw(gph: PIXI.Graphics): void {
    this.cells.forEach(cell => cell.draw(gph));
  }

  public set(x: number, y: number, value: CellType): void {
    const cell = this.cells[y * this.width + x];
    cell.set(value);
  }
}
