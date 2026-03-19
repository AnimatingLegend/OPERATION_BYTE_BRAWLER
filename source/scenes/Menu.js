import { AudioManager } from "../preloads/AudioLoader";
import { AssetLoader } from "../preloads/AssetLoader";

const ITEMS = ['Start Game', 'Donate', 'Credits'];

/* -----------------------------------------------*
*                   Menu.js                       |
*------------------------------------------------*/
export class MenuScene {
     constructor(game) {
          this.game = game;
          this.context = game.context;
          this.selected = 0;
          this.alpha = 0;
     }

     /**
      * Update the menu when navigating.
      * @param {*} delta 
      * @param {*} input 
      */
     update(delta, input) { }

     /**
      * Confirm the selection
      */
     confirm() { }

     /**
      * Render the menu.
      */
     render() {
          const { context } = this;
          const { WIDTH, HEIGHT } = this.game.config;

          context.save();
          context.globalAlpha = this.alpha;

          // Background [THIS IS SUBJECT TO CHANGE]!!!
          context.fillStyle = '#0a0a1a';
          context.fillRect(0, 0, WIDTH, HEIGHT);
     }

     /**
      * Called by the scene manager when entering this state.
      */
     onEnter() { }

     /**
      * Called by the scene manager when leaving this state.
      */
     onExit() { /** Do nothing. */ }
};
