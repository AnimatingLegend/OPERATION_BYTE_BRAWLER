export class Entity {
     constructor(x, y, width, height) {
          this.xAxis = x;
          this.yAxis = y;

          this.width = width;
          this.height = height;

          this.velocityX = 0;
          this.velocityY = 0;

          this.alive = true;
     }

     /**
      * Shared AABB bounds - used for collision detection
      */
     getBounds() { return { x: this.xAxis, y: this.yAxis, width: this.width, height: this.height }; }

     /**
      * Every entity must implement `update()` or `render()`
      */
     update() { throw new Error(`${this.constructor.name} must implement update()`); }
     render() { throw new Error(`${this.constructor.name} must implement render()`); }
}