import { AudioManager } from "../utils/AudioManager";
import { AssetLoader } from "../utils/AssetLoader";

import { GameScene } from './GameScene';
import { CreditsScene } from './CreditsScene';

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
     update(delta, input) {
          // Fade in to the menu.
          this.alpha = Math.min(1, this.alpha + delta * 2.5);

          // Menu Navigation.
          if (input.justPressed('ArrowUp'))
               this.selected = (this.selected - 1 + ITEMS.length) % ITEMS.length;
          if (input.justPressed('ArrowDown'))
               this.selected = (this.selected + 1) % ITEMS.length;
          if (input.justPressed('Enter'))
               this.confirm();
     }

     /**
      * Confirm the selection
      */
     confirm() {
          switch (this.selected) {
               case 0:
                    this.game.switchScene(new GameScene(this.game));
                    break;
               case 1:
                    if (ITEMS[this.selected] === 'Donate') window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
                    break;
               case 2:
                    this.game.switchScene(new CreditsScene(this.game, { returnScene: MenuScene }));
                    break;
          }
     }

     /**
      * Render the menu.
      */
     render() {
          const { context } = this;
          const { WIDTH, HEIGHT } = this.game.config;

          context.clearRect(0, 0, WIDTH, HEIGHT);
          context.save();
          context.globalAlpha = this.alpha;

          context.fillStyle = '#ffffff';
          context.font = '500 48px monospace';
          context.textAlign = 'center';
          context.fillText('OPERATION: BYTE_BRAWLER', WIDTH / 2, 140);

          ITEMS.forEach((item, index) => {
               const yAxis = 250 + index * 50;
               const isSelected = index === this.selected;

               if (isSelected) {
                    context.fillStyle = 'rgba(255, 255, 255, 0.5)';
                    context.beginPath();
                    context.roundRect(WIDTH / 2 - 200, yAxis - 25, 400, 40, 10);
                    context.fill();
               }
               else {
                    // FIXME:
                    // I'm intentionally making the items selection background-color the same as if you're not selecting it.
                    // I'm not sure HOW to fix this, but I'll eventually come back to it. it looks nice anyways lol
                    context.fillStyle = 'rgba(255, 255, 255, 0.2)';
                    context.beginPath();
                    context.roundRect(WIDTH / 2 - 200, yAxis - 25, 400, 40, 10);
                    context.fill();
               }

               context.fillStyle = isSelected ? '#f0c040' : '#666';
               context.font = isSelected ? '500 22px monospace' : '400 20px monospace';
               context.fillText(isSelected ? `> ${item} <` : item, WIDTH / 2, yAxis);
          });

          context.fillStyle = '#444';
          context.font = '13px monospace';
          context.fillText('Arrow keys to navigate   Enter to select', WIDTH / 2, HEIGHT - 24);
          context.restore();
     }

     /**
      * Called by the scene manager when entering and exiting this state.
      */
     onEnter() { /*AudioManager.playLoop('menuMusic', 0.5);*/ }
     onExit() { /*AudioManager.playLoop('menuMusic', 0.5);*/ }
};
