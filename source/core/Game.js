import { InputHandler } from "./InputHandler";
import { MenuScene } from "../scenes/Menu";

export class Game {
     constructor(canvas, context, config) {
          this.canvas = canvas;
          this.context = context;
          this.config = config;
          this.width = config.WIDTH;
          this.height = config.HEIGHT;

          this.input = new InputHandler();
          this.currentScene = null;
          this.lastTime = 0;
          this.running = false;

          // RequestAnimationFrame handler
          this.rafId = null;
     }

     /**
      * Scene Mangament
      * @param {*} newScene 
      */
     switchScene(newScene) {
          if (this.currentScene?.onExit) this.currentScene.onExit();
          this.currentScene = newScene;
          if (this.currentScene?.onEnter) this.currentScene.onEnter();

          // Log scene changes.
          console.log(`[INFO] Switching to ${newScene.constructor.name}.`);
          console.log(`[WARNING] Does ${this.currentScene?.constructor.name} have a render or update ${typeof newScene?.render}?`);
     }

     /**
      * Start the game.
      */
     start() {
          if (this.running) return;

          this.running = true;
          this.lastTime = performance.now();
          this.rafId = requestAnimationFrame(this.loop.bind(this));
     }

     /**
      * Stop the game.
      */
     stop() {
          this.running = false;

          if (this.rafId) {
               cancelAnimationFrame(this.rafId);
               this.rafId = null;
          }
     }

     /**
      * Game Loop
      * @param {*} timestamp 
      * @returns 
      */
     loop(timestamp) {
          if (!this.running) return;

          // Delta time in seconds. capped to 0.05s (50ms | =3 missed frames).
          // This cap prevents huge jumps if the game loses focus.
          const delta = Math.min((timestamp - this.lastTime) / 1000, 0.05);
          this.lastTime = timestamp;

          if (this.currentScene) {
               this.currentScene.update(delta, this.input);
               this.currentScene.render();
          }

          this.input.flush(); // Flush **after** rendering to prevent input lag.
          this.rafId = requestAnimationFrame(this.loop.bind(this));
     }
};
