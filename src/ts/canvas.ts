type CanvasColour = string | CanvasGradient | CanvasPattern;
type RGB = [number, number, number];

interface ICanvasStyle {
  fillStyle: CanvasColour;
  font: string;
  lineWidth: number;
  strokeStyle: CanvasColour;
}

export default class Canvas {
  private ctx: CanvasRenderingContext2D;
  private style: ICanvasStyle;

  constructor(width = window.innerWidth, height = window.innerHeight) {
    this.createCanvas(width, height);
  }

  get width() {
    return this.ctx.canvas.width;
  }

  get height() {
    return this.ctx.canvas.height;
  }

  get fillColour() {
    const fillColour = this.ctx.fillStyle;
    return [fillColour[4], fillColour[7], fillColour[10]];
  }

  set fillColour(rgb: RGB) {
    this.ctx.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  }

  get strokeColour() {
    const strokeColour = this.ctx.strokeStyle;
    return [strokeColour[4], strokeColour[7], strokeColour[10]];
  }

  set strokeColour(rgb: RGB) {
    this.ctx.strokeStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  }

  public start(draw: () => void) {
    draw();
    requestAnimationFrame(() => {
      this.start(draw);
    });
  }

  public background(colour: RGB) {
    this.push();
    this.fillColour = colour;
    this.rect(0, 0, this.width, this.height);
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

  public rect(x: number, y: number, w: number, h: number) {
    this.ctx.beginPath();
    this.ctx.rect(x, y, x + w, y + h);
    this.ctx.fill();
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
    canvas.width = width;
    canvas.height = height;
    this.ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
  }
}
