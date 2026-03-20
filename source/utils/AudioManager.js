/**
 * @description A list of loaded audio buffers by key.
 * @property {Object} bufferCache[key]
 */
const bufferCache = {};

/**
 * @description A list of currently playing loops.
 * @property {Object} loops[key]
 */
const loops = {};

/**
 * @description Audio context and gain nodes.
 * @property {AudioContext} context
 * @property {GainNode} masterGain
 * @property {GainNode} musicGain
 * @property {GainNode} sfxGain
 */
let context, masterGain, musicGain, sfxGain = null;

/* -----------------------------------------------*
*                AudioManager.js                  |
*------------------------------------------------*/
export const AudioManager = {

     /**
      * Initialize the audio system.
      */
     create() {
          if (context) return; // If the audio context is already initialized, dont create it again.

          context = new (window.AudioContext || window.webkitAudioContext)();
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
          if (!source) return;

          // Load the sound if it hasn't been loaded yet.
          try {
               const response = await fetch(source);
               if (!response.ok) throw new Error(`HTTP ${response.status} - ${source}`);

               const arrayBuffer = await response.arrayBuffer();
               bufferCache[key] = await context.decodeAudioData(arrayBuffer);
          } catch (error) {
               console.warn(`[WARNING | AUDIO MANAGER] Could not load '${key}' from '${source}'.`, error);
          }
     },

     /**
      * Load multiple sounds at once from a `{ key: path }` manifest.
      * @param {*} manifest 
      */
     async loadAll(manifest) {
          const entries = Object.entries(manifest);
          if (entries.length === 0) return;
          await Promise.all(Object.entries(manifest).map(([key, source]) => this.load(key, source)));
     },

     /**
      * Play a one-shot sound effect.
      * @param {*} key 
      * @param {*} volume 
      * @returns 
      */
     play(key, volume = 1.0) {
          // if a sound hasn't been loaded yet, do do anything.
          if (!context || !bufferCache[key]) return;

          // Create a fresh source node every time to prevent memory leaks.
          const source = context.createBufferSource();
          const gainNode = context.createGain();

          source.buffer = bufferCache[key];
          gainNode.gain.value = volume;

          source.connect(gainNode);
          gainNode.connect(sfxGain);
          source.start();

          // UPDATE: source auto-disconnects when done, so no `return source; ` is needed!
          // BUT im keep it here just incase...
          // return source;
     },

     /**
      * Play a lopping track (i.e. background music).
      * @param {*} key 
      * @param {*} volume 
      */
     playLoop(key, volume = 1.0) {
          // stop any existing loops if its already playing.
          if (!context || !bufferCache[key]) return;
          this.stopLoop(key);

          const source = context.createBufferSource();
          const gainNode = context.createGain();

          source.buffer = bufferCache[key];
          source.loop = true;
          gainNode.gain.value = volume;

          source.connect(gainNode);
          gainNode.connect(musicGain);
          source.start();

          loops[key] = { source, gainNode };
     },

     /**
      * Stop a looping track.
      * @param {*} key 
      */
     stopLoop(key) {
          if (!loops[key]) return;
          try { loops[key].source.stop(); } catch (_) { /** Do nothing. */ }
          delete loops[key];
     },

     /**
      * Fade music out over `duration` seconds
      * @param {*} key 
      * @param {*} duration 
      * @returns 
      */
     fadeOut(key, duration = 1.0) {
          if (!context || !loops[key]) return;

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
     resume() { if (context && context.state === 'suspended') context.resume(); }
};
