import * as PIXI from 'pixi.js';

import './styles.css';
import * as rust from '../pkg';

import Grid from './grid';
import { CellType } from './cell';

rust.say_hello();

const canvasScale = 0.75;
const gridScale = 10;
const width = Math.floor((window.innerWidth / gridScale) * canvasScale);
const height = Math.floor((window.innerHeight / gridScale) * canvasScale);

const config = { width: width * gridScale, height: height * gridScale };
const app = new PIXI.Application(config);
const gph = new PIXI.Graphics();

app.stage.interactive = true;
document.body.appendChild(app.view);

const grid = new Grid(width, height, gridScale, CellType.Air);
grid.draw(gph);
app.stage.addChild(gph);

app.stage.on('pointerdown', (e: PIXI.InteractionEvent) => {
  const x = Math.floor(e.data.global.x / gridScale);
  const y = Math.floor(e.data.global.y / gridScale);
  grid.set(x, y, CellType.Sand);
});

app.ticker.add(() => {
  grid.draw(gph);
  app.render();
});
