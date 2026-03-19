const images = [];
const sounds = [];

/* -----------------------------------------------*
*                AssetLoader.js                   |
*------------------------------------------------*/
export const AssetLoader = {

     /**
      * Load all of your assets.
      * @param {*} { images: imagePaths = {}, sounds: soundPaths = {} } 
      */
     async load({ images: imagePaths = {}, sounds: soundPaths = {} }) {
          await Promise.all([
               ...Object.entries(imagePaths).map(([key, source]) => this.loadImage(key, source)),
               ...Object.entries(soundPaths).map(([key, source]) => this.loadSound(key, source)),
          ]);
     },

     /**
      * Load an image.
      * @param {*} key 
      * @param {*} source 
      * @returns 
      */
     loadImage(key, source) {
          return new Promise((resolve, reject) => {
               const image = new Image();
               image.onLoad = () => { images[key] = image; resolve(); };
               image.onError = () => { reject(new Error(`Failed to load image: ${source}`)); };
               image.src = source;
          });
     },

     /**
      * Load a sound.
      * @param {*} key 
      * @param {*} source 
      * @returns 
      */
     loadSound(key, source) {
          return new Promise((resolve, reject) => {
               const sound = new Audio();
               sound.onLoad = () => { sounds[key] = sound; resolve(); };
               sound.onError = () => { reject(new Error(`Failed to load sound: ${source}`)); };
               sound.src = source;
          });
     },

     /**
      * Get an image.
      * You can use this function anywhere in the game.
      * @param {*} key 
      * @returns 
      */
     getImage(key) {
          if (!images[key]) throw new Error(`Image not found: ${key}`);
          return images[key];
     },

     /**
      * Get a sound.
      * You can use this function anywhere in the game.
      * @param {*} key 
      * @returns 
      */
     getSound(key) {
          if (!sounds[key]) throw new Error(`Sound not found: ${key}`);
          return sounds[key];
     }
};
