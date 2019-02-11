if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload();
  });
}

import Canvas from './canvas';

const canvas = new Canvas();

function draw() {
  canvas.background('#ffffff');
}

canvas.start(draw);
