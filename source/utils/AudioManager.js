const context = new (window.AudioContext || window.webkitAudioContext)();
const bufferCache = {};
const loops = {};

let masterGain;
let musicGain;
let sfxGain;

/* -----------------------------------------------*
*                AudioManager.js                  |
*------------------------------------------------*/
export const AudioManager = {

     /**
      * Initialize the audio system.
      */
     async create() {
          // Master volume chain: `masterGain` -> music/sfx splits -> destination.
          masterGain = context.createGain();
          musicGain = context.createGain();
          sfxGain = context.createGain();

          masterGain.connect(context.destination);
          musicGain.connect(masterGain);
          sfxGain.connect(masterGain);

          masterGain.gain.value = 1.0;
          musicGain.gain.value = 0.5;
          sfxGain.gain.value = 1.0;
     },

     /**
      * Preload a sound by key.
      * @param {*} key 
      * @param {*} source 
      */
     async load(key, source) {
          const response = await fetch(source);
          const arrayBuffer = await response.arrayBuffer();
          bufferCache[key] = await context.decodeAudioData(arrayBuffer);
     },

     /**
      * Load multiple sounds at once.
      * @param {*} manifest 
      */
     async loadAll(manifest) { await Promise.all(Object.entries(manifest).map(([key, source]) => this.load(key, source))); },

     /**
      * Play a one-shot sound effect.
      * @param {*} key 
      * @param {*} volume 
      * @returns 
      */
     play(key, volume = 1.0) {
          // if a sound hasn't been loaded yet, do do anything.
          if (!bufferCache[key]) return;

          // Create a fresh source node every time to prevent memory leaks.
          const source = context.createBufferSource();
          const gainNode = context.createGain();

          source.buffer = bufferCache[key];
          gainNode.gain.value = volume;

          source.connect(gainNode);
          gainNode.connect(sfxGain);
          source.start();

          // UPDATE: source auto-disconnects when done, so no `return source;` is needed!
          // return source;
     },

     /**
      * Play a lopping track (background music).
      * @param {*} key 
      * @param {*} volume 
      */
     playLoop(key, volume = 1.0) {
          // stop any existing loops if its already playing.
          this.stopLoop(key);

          const source = context.createBufferSource();
          const gainNode = context.createGain();

          source.buffer = bufferCache[key];
          source.loop = true;
          gainNode.gain.value = volume;

          source.connect(gainNode);
          gainNode.connect(musicGain);
          source.start();

          loops[key] = source;
     },

     /**
      * Stop a loop from playing.
      * @param {*} key 
      */
     stopLoop(key) {
          if (loops[key]) {
               loops[key].stop();
               delete loops[key];
          }
     },

     /**
      * Fade music out over `duration` seconds
      * @param {*} key 
      * @param {*} duration 
      * @returns 
      */
     fadeOut(key, duration = 1.0) {
          if (!loops[key]) return;

          const { gainNode } = loops[key];
          gainNode.gain.setValueAtTime(0, context.currentTime);
          gainNode.gain.linearRampToValueAtTime(0, context.currentTime + duration);
          setTimeout(() => this.stopLoop(key), duration * 1000);
     },

     /**
      * Global volume controls
      * @param {*} volume 
      */
     setMasterVolume(volume) { masterGain.gain.value = volume; },
     setMusicVolume(volume) { musicGain.gain.value = volume; },
     setSFXVolume(volume) { sfxGain.gain.value = volume; },

     /**
      * Must be called after a user gesture (mouse click, keyboard press, etc.).
      */
     resume() { if (context.state === 'suspended') context.resume(); }
};
