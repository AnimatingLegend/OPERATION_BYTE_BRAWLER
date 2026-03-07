# Programming Style Guide

**DISCLAIMER**  
Inspired by the [Funkin' Style Guide](https://github.com/FunkinCrew/Funkin/blob/dummy/develop-v0.7.5/docs/style-guide.md#funkin-repo-code-style-guide).  
This project is written in **Node.js** using **Vite.js v7.3**, not Haxe / HaxeFlixel.

## Purpose
This document explains how code should be written and maintained for **[RPG GAME]**.  
The goal is consistency, readability, and easy maintenance.

## General Rules
- Readability over clever code  
- Stay consistent within files  
- Avoid unnecessary complexity  
- If it looks confusing, clean it up  

## Variables & Function Names
Use descriptive names.  
Allowed styles:
- `lowerCamelCase` (preferred)
- `snake_case`

Stay consistent per file.

**EXAMPLE:**
```js
const gameWindow = {
     GAME_WIDTH: 1280,
     GAME_HEIGHT: 720,
     FRAMERATE: 60
};

function setupGame() {
     let game = new Game(gameWindow);
     add(gameWindow);
}
```

### Guidelines:
- Functions should describe what they do
- Booleans should read clearly
- Avoid single-letter variables unless in short loops

```js
// Good!
const isReady = true;
function loadEnemies() {}

// AVOID !!!
const x = true;
function doThing() {}
```

## File & Folder Naming
- Perfer `snake_case` for folders.
- Files should match its intended purpose.

**EXAMPLE:**
```
source/
├── constants/
│   ├── map_data.js
│   └── player_stats.js
└── entities/
    ├── player.js
    ├── enemy.js
    └── npc.js
```

## Formatting
- Use consistent indentation
- Seperate logical sections with spacing
- avoid deep resting

**BAD, DO NOT DO THIS**
```js
if (a) {
     if (b) {
          if (c) {

          }
     }
}
```

**GOOD, DO THIS INSTEAD**
```js
if (!a || !b || !c) return;
run();
```