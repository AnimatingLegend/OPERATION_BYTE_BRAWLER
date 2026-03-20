import { AudioManager } from "../utils/AudioManager";

/**
 * @description A list of contributors.
 * @property {Object} CREDITS
 */
const CREDITS = [
     { role: "Head of Development, Programmer, Artist", name: "Animating Legend" },
     { role: "Programmer", name: "F4LDR" },
     { role: "Artist / Animation", name: "YoshiChuu" },
     { role: "SFX / Music", name: "Blu" },
];

/* -----------------------------------------------*
*               CreditsScene.js                   |
*------------------------------------------------*/
export class CreditsScene {
     constructor(game, options = {}) {
          this.game = game;
          this.context = game.context;
          this.returnScene = options.returnScene || null;

          // Scroll State
          this.scrollY = game.config.HEIGHT; // Start at the bottom.
          this.speed = 40; // Pixels (px) per second.
          this.done = false;
          this.alpha = 0; // Fade in.
     }

     update(delta, input) {
          this.alpha = Math.min(1, this.alpha + delta * 2.5);
          this.scrollY -= this.speed * delta;

          // Skip / Go back to the main menu.
          if (input.justPressed('Escape') || input.justPressed('Backspace') || this.done) {
               this.goBack();
               return;
          }

          // Speed up scroll while holding enter or space.
          // Speed it up by 3x.
          const scrollBoost = input.isHeld('Space') || input.isHeld('Enter') ? 3 : 1;
          this.scrollY -= this.speed * delta * (scrollBoost - 1);
     }

     /**
      * Go back to the main menu.
      */
     goBack() { if (this.returnScene) this.game.switchScene(new this.returnScene(this.game)); }

     render() {
          const { context } = this;
          const { WIDTH, HEIGHT } = this.game.config;

          context.clearRect(0, 0, WIDTH, HEIGHT);
          context.save();
          context.globalAlpha = this.alpha;

          // Background
          context.fillStyle = '#0a0a1a';
          context.fillRect(0, 0, WIDTH, HEIGHT);

          // Title Text
          context.fillStyle = '#ffffff';
          context.font = '700 36px monospace';
          context.textAlign = 'center';
          context.fillText('CREDITS', WIDTH / 2, 140);

          // Divider
          /*
          context.fillStyle = '#1a2744';
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(WIDTH / 2 - 120, this.scrollY + 20);
          context.lineTo(WIDTH / 2 + 120, this.scrollY + 20);
          context.stroke();
          */

          // Add the credits.
          let yAxis = this.scrollY + 70;
          CREDITS.forEach(credit => {
               // Role Label (programmer, artist, etc.)
               context.fillStyle = '#5a6285';
               context.font = '400 15px monospace';
               context.textAlign = 'center';
               context.fillText(credit.role.toUpperCase(), WIDTH / 2, yAxis);

               // Name Labels
               context.fillStyle = '#ffffff';
               context.font = '500 20px monospace';
               context.fillText(credit.name, WIDTH / 2, yAxis + 25);

               yAxis += 70;
          });

          // Game title, and footer text at the end.
          yAxis += 20;
          context.fillStyle = '#00e5ff';
          context.font = '700 28px monospace';
          context.fillText('OPERATION: BYTE_BRAWLER', WIDTH / 2, yAxis);
          context.fillStyle = '#5a6285';
          context.font = '400 13px monospace';
          context.fillText('Thank you for playing!', WIDTH / 2, yAxis + 36);

          // Check if credits have fully scrolled past border.
          if (yAxis + 80 < 0) this.done = true;

          // Put a little hint at the bottom - fixed to the screen.
          context.globalAlpha = 0.4;
          context.fillStyle = '#ffffff';
          context.font = '12px monospace';
          context.fillText('Press ESCAPE to go back  SPACE to speed up credits', WIDTH / 2, HEIGHT - 20);
          context.restore();
     }

     onEnter() { /*AudioManager.playLoop('menuMusic', 0.5);*/ }
     onExit() { /*AudioManager.stopLoop('menuMusic');*/ }
}