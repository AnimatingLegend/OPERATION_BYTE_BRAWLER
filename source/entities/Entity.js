export class Entity {
     conststructor(x, y, width, height) {
          this.x = x; this.y = y;
          this.width = width; this.height = height;
          this.velocityX = 0; this.velocityY = 0;
          this.alive = true;
     }

     /**
      * Shared AABB bounds - used for collision detection
      */
     getBounds() { return { x: this.x, y: this.y, width: this.width, height: this.height }; }

     /**
      * Every entity must implement `update()` or `render()`
      */
     update() { throw new Error(`${this.conststructor.name} must implement update()`); }
     render() { throw new Error(`${this.conststructor.name} must implement render()`); }
}