type CanvasColour = string | CanvasGradient | CanvasPattern;

interface ICanvasStyle {
  fillStyle: CanvasColour;
  font: string;
  lineWidth: number;
  strokeStyle: CanvasColour;
}

export default class Canvas {
  public width: number;
  public height: number;
  private ctx: CanvasRenderingContext2D;
  private style: ICanvasStyle;

  constructor(width = window.innerWidth, height = window.innerHeight) {
    this.createCanvas(width, height);
  }

  public start(draw: () => void) {
    draw();
    requestAnimationFrame(() => {
      this.start(draw);
    });
  }

  public setFill(colour: CanvasColour) {
    this.ctx.fillStyle = colour;
  }

  public background(colour: CanvasColour) {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.width, this.height);
    this.push();
    this.ctx.fillStyle = colour;
    this.ctx.fill();
    this.pop();
  }

  public point(x: number, y: number, r: number) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  public line(x1: number, y1: number, x2: number, y2: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  private push() {
    this.style = {
      fillStyle: this.ctx.fillStyle,
      font: this.ctx.font,
      lineWidth: this.ctx.lineWidth,
      strokeStyle: this.ctx.strokeStyle
    };
  }

  private pop() {
    this.ctx.fillStyle = this.style.fillStyle;
    this.ctx.font = this.style.font;
    this.ctx.lineWidth = this.style.lineWidth;
    this.ctx.strokeStyle = this.style.strokeStyle;
  }

  private createCanvas(width: number, height: number) {
    const canvas = document.createElement('canvas');
    this.width = canvas.width = width;
    this.height = canvas.height = height;
    this.ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
  }
}
