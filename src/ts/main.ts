import p5js from 'p5';

function sketch(p5: p5js) {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
  };

  p5.draw = () => {
    p5.background(0);
  };
}

const project = new p5js(sketch);
