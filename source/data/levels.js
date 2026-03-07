/**
 * Sector 1 (Level 1)
 * All of these types are going to be hardcoded just to understand the game's structure.
 * This is subject to change.
 * @type {{keys: [], boss: {}, walls: []}}
 */
export const SECTOR_ONE = {
     keys: [{ x: 2, y: 2 }, { x: 7, y: 3 }, { x: 4, y: 8 }],
     boss: { x: 9, y: 9, name: 'BOSS', health: 50 },
     walls: [{ x: 5, y: 5 }, { x: 5, y: 6 }, { x: 4, y: 5 }] // Obstacles
};