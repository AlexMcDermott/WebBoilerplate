// import p5js from 'p5';

// function sketch(p5: p5js) {
//   p5.setup = () => {
//     p5.createCanvas(p5.windowWidth, p5.windowHeight);
//   };

//   p5.draw = () => {
//     p5.background(0);
//   };
// }

// const project = new p5js(sketch);

// ############################################################################

import * as twgl from 'twgl.js';

// @ts-ignore
import fragmentSource from './shader/fragment.glsl';
// @ts-ignore
import vertexSource from './shader/vertex.glsl';

const cnv = document.createElement('canvas');
cnv.width = window.innerWidth;
cnv.height = window.innerHeight;
document.body.appendChild(cnv);
const gl = cnv.getContext('webgl');

const programInfo = twgl.createProgramInfo(gl, [vertexSource, fragmentSource]);
const vertices = [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0];
const arrays = { position: vertices };
const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

function render(time: DOMHighResTimeStamp) {
  twgl.resizeCanvasToDisplaySize(cnv);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  const uniforms = {
    resolution: [gl.canvas.width, gl.canvas.height],
    time: time * 0.001,
  };

  gl.useProgram(programInfo.program);
  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
  twgl.setUniforms(programInfo, uniforms);
  twgl.drawBufferInfo(gl, bufferInfo);

  requestAnimationFrame(render);
}

requestAnimationFrame(render);

window.addEventListener('resize', () => {
  cnv.width = window.innerWidth;
  cnv.height = window.innerHeight;
  requestAnimationFrame(render);
});
