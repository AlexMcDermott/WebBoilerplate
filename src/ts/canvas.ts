type RGB = [number, number, number];

export default class Canvas {
  public width: number;
  public height: number;
  public pixelScaledWidth: number;
  public pixelScaledHeight: number;
  public framerate: string = null;
  private ctx: CanvasRenderingContext2D;
  private image: ImageData = null;
  private loop = true;
  private pixelScale = 1;

  constructor(width = window.innerWidth, height = window.innerHeight) {
    this.createCanvas(width, height);
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
    this.pixelScaledWidth = width;
    this.pixelScaledHeight = height;
    this.background([255, 255, 255]);
  }

  public start(draw: () => void) {
    if (this.loop) {
      this.calcFramerate(draw);
      requestAnimationFrame(() => {
        this.start(draw);
      });
    }
  }

  public noLoop() {
    this.loop = false;
  }

  public getColour(): RGB {
    const hex = this.ctx.fillStyle;
    if (typeof hex === 'string') {
      const r = parseInt(hex.substring(1, 3), 16);
      const g = parseInt(hex.substring(3, 5), 16);
      const b = parseInt(hex.substring(5), 16);
      return [r, g, b];
    }
  }

  public setColour(colour: RGB) {
    this.ctx.fillStyle = `rgb(${colour[0]}, ${colour[1]}, ${colour[2]})`;
    this.ctx.strokeStyle = `rgb(${colour[0]}, ${colour[1]}, ${colour[2]})`;
  }

  public setPixelScale(scl: number) {
    this.pixelScale = scl;
    this.pixelScaledWidth = Math.round(this.width / this.pixelScale);
    this.pixelScaledHeight = Math.round(this.height / this.pixelScale);
  }

  public set(x: number, y: number) {
    if (this.image === null) {
      this.image = this.ctx.getImageData(0, 0, this.width, this.height);
    }
    if (this.pixelScale === 1) {
      const rgb = this.getColour();
      const index = y * 4 * this.width + x * 4;
      this.image.data[index] = rgb[0];
      this.image.data[index + 1] = rgb[1];
      this.image.data[index + 2] = rgb[2];
    } else {
      this.rect(x * this.pixelScale, y * this.pixelScale, this.pixelScale);
    }
  }

  public updatePixels() {
    if (this.image !== null) {
      this.ctx.putImageData(this.image, 0, 0);
      this.image = null;
    }
  }

  public setFont(
    size: number,
    font = 'serif',
    vAlign: CanvasTextAlign = 'center',
    hAlign: CanvasTextBaseline = 'middle'
  ) {
    this.ctx.font = `${size}px ${font}`;
    this.ctx.textAlign = vAlign;
    this.ctx.textBaseline = hAlign;
  }

  public text(text: string, x: number, y: number) {
    this.ctx.fillText(text, x, y);
  }

  public showFramerate() {
    if (this.framerate !== null) {
      this.setColour([255, 255, 255]);
      this.rect(0, 0, 35, 20);
      this.setColour([0, 0, 0]);
      this.setFont(20, 'serif', 'left', 'top');
      this.text(this.framerate, 0, 0);
    }
  }

  public background(colour: RGB) {
    const temp = this.getColour();
    this.setColour(colour);
    this.rect(0, 0, this.width, this.height);
    this.setColour(temp);
  }

  public line(x1: number, y1: number, x2: number, y2: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  public rect(x: number, y: number, w: number, h = w) {
    this.ctx.beginPath();
    this.ctx.rect(x, y, w, h);
    this.ctx.fill();
  }

  public circle(x: number, y: number, r: number, a1 = 0, a2 = 2 * Math.PI) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, a1, a2);
    this.ctx.fill();
  }

  private createCanvas(width: number, height: number) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    this.ctx = canvas.getContext('2d');
  }

  private calcFramerate(draw: () => void) {
    const start = performance.now();
    draw();
    const end = performance.now();
    this.framerate = (1 / ((end - start) / 1000)).toFixed(1);
  }
}
