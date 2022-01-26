import * as PIXI from 'pixi.js';

export enum CellType {
  Air,
  Sand,
}

export class Cell {
  private x: number;
  private y: number;
  private size: number;
  private type: CellType;
  public needsRedraw: boolean;

  constructor(x: number, y: number, size: number, type: CellType) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.type = type;
    this.needsRedraw = true;
  }

  public draw(gph: PIXI.Graphics): void {
    if (!this.needsRedraw) return;
    switch (this.type) {
      case CellType.Air: {
        gph.beginFill(0xd1d1d1);
        break;
      }
      case CellType.Sand: {
        gph.beginFill(0xffff00);
        break;
      }
      default: {
        gph.beginFill(0x000000);
        break;
      }
    }
    this.needsRedraw = false;
    gph.drawRect(this.x, this.y, this.size, this.size);
  }

  public set(type: CellType) {
    this.type = type;
    this.needsRedraw = true;
  }
}
