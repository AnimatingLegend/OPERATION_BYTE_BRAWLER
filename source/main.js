import { AssetLoader } from "./utils/AssetLoader";
import { AudioManager } from "./utils/AudioManager";
import { Game } from "./core/Game";
import { MenuScene } from "./scenes/Menu";
import config from "./config";

const canvas = document.getElementById('game');
const wrapper = document.getElementById('game-wrapper');
const context = canvas.getContext('2d');

canvas.width = config.WIDTH;
canvas.height = config.HEIGHT;

/* -----------------------------------------------*
*                 Main.js                         |
*          Where the magic happens :)             |
*------------------------------------------------*/

/**
 * Resize the canvas when the window is resized.
 */
function resize() {
     const scaleX = window.innerWidth / config.WIDTH;
     const scaleY = window.innerHeight / config.HEIGHT;
     const scale = Math.floor(Math.min(scaleX, scaleY));

     wrapper.style.width = `${config.WIDTH * scale}px`;
     wrapper.style.height = `${config.HEIGHT * scale}px`;
}

resize();
window.addEventListener('resize', resize);

// Resume AudioContext after first user gesture.
document.addEventListener('keydown', () => AudioManager.resume(), { once: true });
document.addEventListener('click', () => AudioManager.resume(), { once: true });

/**
 * Initialize the game.
 */
async function create() {
     await AssetLoader.load({});
     await AudioManager.load({});

     const game = new Game(canvas, context, config);
     game.switchScene(new MenuScene(game));
     game.start();
}

create().catch(console.error);