export class InputHandler {
     constructor() {
          // Currently held keys
          this.held = new Set();

          // Keys pressed this frame
          this.pressedThisFrame = new Set();

          // Keys released this frame
          this.releasedThisFrame = new Set();

          window.addEventListener('keydown', this.onKeyDown.bind(this));
          window.addEventListener('keyup', this.onKeyUp.bind(this));
     }

     /**
      * On key down, add the key to held.
      * @param {*} event 
      */
     onKeyDown(keyEvent) {
          // Prevent browser shortcuts (space scrolling, arrow keys, shifting page, etc.).
          if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(keyEvent.code)) keyEvent.preventDefault();

          // Only register as 'just pressed' on the inital press.
          // not on the repeated keydown events.
          if (!this.held.has(keyEvent.code)) this.pressedThisFrame.add(keyEvent.code);

          this.held.add(keyEvent.code);
     }

     /**
      * On key up, remove the key from held.
      * @param {*} event 
      */
     onKeyUp(keyEvent) {
          this.held.delete(keyEvent.code);
          this.releasedThisFrame.add(keyEvent.code);
     }

     /**
      * True every frame the key is held - use for movement.
      * @param {*} code 
      */
     isHeld(code) { return this.held.has(code); }

     /**
      * True for only **one frame** when the key is first pressed. - use for jumping and menu navigation.
      * @param {*} code 
      */
     justPressed(code) { return this.pressedThisFrame.has(code); }

     /**
      * True for only **one frame** when the key is released. - use for variable jumping.
      * @param {*} code 
      */
     justReleased(code) { return this.releasedThisFrame.has(code); }

     /**
      * horizontal axis (-1, 0 or 1) 
      */
     axis() {
          const left = this.isHeld('ArrowLeft') || this.isHeld('KeyA') ? -1 : 0;
          const right = this.isHeld('ArrowRight') || this.isHeld('KeyD') ? 1 : 0;
          return left + right;
     }

     /**
      * Called at the end of every frame.
      * @see Game.js
      */
     flush() {
          this.pressedThisFrame.clear();
          this.releasedThisFrame.clear();
     }

     /**
      * Clean up event listeners. if the game is destroyed.
      */
     destroy() {
          window.removeEventListener('keydown', this.onKeyDown.bind(this));
          window.removeEventListener('keyup', this.onKeyUp.bind(this));
     }
}