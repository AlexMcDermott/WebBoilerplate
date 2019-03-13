type CanvasColour = string | CanvasGradient | CanvasPattern;
type RGB = [number, number, number];
type pixelOperation = [number, number];

interface ICanvasStyle {
  fillStyle: CanvasColour;
  font: string;
  lineWidth: number;
  strokeStyle: CanvasColour;
}

export default class Canvas {
  private ctx: CanvasRenderingContext2D;
  private style: ICanvasStyle;
  private pixelOperations: pixelOperation[] = [];
  private loop = true;
  private framerate = 0;

  constructor(width = window.innerWidth, height = window.innerHeight) {
    this.createCanvas(width, height);
  }

  get width() {
    return this.ctx.canvas.width;
  }

  get height() {
    return this.ctx.canvas.height;
  }

  get fps() {
    return this.framerate;
  }

  get fillColour() {
    const hex = this.ctx.fillStyle;
    if (typeof hex === 'string') {
      const r = parseInt(hex.substring(1, 3), 16);
      const g = parseInt(hex.substring(3, 5), 16);
      const b = parseInt(hex.substring(5), 16);
      return [r, g, b];
    }
    throw new Error(
      'CanvasGradient or CanvasPattern colour types are not supported.'
    );
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
    if (this.loop) {
      const start = performance.now();
      draw();
      this.updatePixels();
      const end = performance.now();
      this.framerate = 1 / ((end - start) / 1000);
      requestAnimationFrame(() => {
        this.start(draw);
      });
    }
  }

  public noLoop() {
    this.loop = false;
  }

  public set(x: number, y: number) {
    const rgb = this.fillColour;
    const index = y * this.width * 4 + x * 4;
    this.pixelOperations.push([index, rgb[0]]);
    this.pixelOperations.push([index + 1, rgb[1]]);
    this.pixelOperations.push([index + 2, rgb[2]]);
  }

  public background(colour: RGB) {
    this.push();
    this.fillColour = colour;
    this.rect(0, 0, this.width, this.height);
    this.pop();
  }

  public line(x1: number, y1: number, x2: number, y2: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  public rect(x: number, y: number, w: number, h: number) {
    this.ctx.beginPath();
    this.ctx.rect(x, y, w, h);
    this.ctx.fill();
  }

  public circle(x: number, y: number, r: number) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  private push() {
    this.style = {
      fillStyle: this.ctx.fillStyle,
      font: this.ctx.font,
      lineWidth: this.ctx.lineWidth,
      strokeStyle: this.ctx.strokeStyle,
    };
  }

  private pop() {
    this.ctx.fillStyle = this.style.fillStyle;
    this.ctx.font = this.style.font;
    this.ctx.lineWidth = this.style.lineWidth;
    this.ctx.strokeStyle = this.style.strokeStyle;
  }

  private updatePixels() {
    const image = this.ctx.getImageData(0, 0, this.width, this.height);
    const pixels = image.data;
    for (const operation of this.pixelOperations) {
      const index = operation[0];
      const value = operation[1];
      pixels[index] = value;
    }
    this.ctx.putImageData(image, 0, 0);
  }

  private createCanvas(width: number, height: number) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    this.ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
  }
}
