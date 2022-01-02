import './styles.css';
import * as rust from '../pkg';

import * as PIXI from 'pixi.js';
import Grid from './grid';

rust.say_hello();

const scl = 10;
const width = Math.floor(window.innerWidth / scl / 2);
const height = Math.floor(window.innerHeight / scl / 2);

const app = new PIXI.Application({ width: width * scl, height: height * scl });
document.body.appendChild(app.view);

const gph = new PIXI.Graphics();

const grid = new Grid(width, height, scl, 0xff00ff);
grid.draw(gph);

app.stage.addChild(gph);
