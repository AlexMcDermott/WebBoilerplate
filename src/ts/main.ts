import Canvas from './canvas';

const cnv = new Canvas();

function draw() {
  cnv.background([255, 255, 255]);
}

cnv.start(draw);
