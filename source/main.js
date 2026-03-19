import { AssetLoader } from "./preloads/AssetLoader";
import { AudioManager } from "./preloads/AudioManager";
import { MenuScene } from "./scenes/Menu";
import config from "./config";

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = config.WIDTH;
canvas.height = config.HEIGHT;

/* -----------------------------------------------*
*                 Main.js                         |
*          Where the magic happens :)             |
*------------------------------------------------*/
async function create() {
     await AssetLoader.load({});
     await AudioManager.load({});

     const game = new Gamepad(canvas, context, config);
     game.switchScene(new MenuScene(game));
     game.start();
}

create().catch(console.error);