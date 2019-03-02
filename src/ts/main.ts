if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload();
  });
}

import Canvas from './canvas';

const canvas = new Canvas();

function draw() {
  canvas.background([255, 255, 255]);
}

canvas.start(draw);
