/**
 * Game map size.
 * @type {number}
 */
export const GRID_SIZE = 10;

/**
 * Player start position.
 * @type {{x: number, y: number}}
 */
export const PLAYER_START = { x: 0, y: 0 };

/**
 * Players starting health [DEFAULT: 100].
 * @types {number}
 */
export const INITIAL_HEALTH = 100;

/**
 * Number of keys required to win the game.
 * @type {number}
 */
export const DATA_KEYS = 3;

/**
 * Entity types.
 * @type {{PLAYER: string, BOSS: string, WALL: string, KEY: string, EMPTY: string}}
 */
export const ENTITY_TYPES = {
     PLAYER: 'PLAYER',
     BOSS: 'BOSS',
     WALL: 'WALL',
     KEY: 'KEY',
     EMPTY: 'EMPTY'
};