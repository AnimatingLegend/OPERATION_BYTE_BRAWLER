import React from "react";
import Cell from "./Cell";
import { GRID_SIZE, ENTITY_TYPES } from "../data/constants";
import { SECTOR_ONE } from "../data/levels";

const Grid = ({ playerPos, keys }) => { 
     const cells = [];

     /**
      * Grid component that renders the games map based on the player's position.
      * @type {Object} - The properties passed to the Grid component.
      * @property {Object} playerPos - The current position of the player on the grid.
      * @property {Array} keys - The list of keys currently on the grid.
      */
     for (let y = 0; y < GRID_SIZE; y++) {
          for (let x = 0; x < GRID_SIZE; x++) {
               let type = ENTITY_TYPES.EMPTY;

               /**
                * If the current cell matches the player, the key, or the boss's position, set the cell type.
                * Otherwise, it remains an empty cell. (a wall).
                */
               if (x === playerPos.x && y === playerPos.y) type = ENTITY_TYPES.PLAYER;
               else if (x === SECTOR_ONE.boss.x && y === SECTOR_ONE.boss.y) type = ENTITY_TYPES.BOSS;
               else if (keys.some(key => key.x === x && key.y === y)) type = ENTITY_TYPES.KEY;
               else if (SECTOR_ONE.walls.some(wall => wall.x === x && wall.y === y)) type = ENTITY_TYPES.WALL;

               cells.push(<Cell key={`${x}-${y}`} type={type}></Cell>);
          }
     }

     /**
      * Render the grid with the generated cells.
      * @returns {JSX.Element}
      */
     return (
          <div style={{
               display: 'grid',
               gridTemplateColumns: `repeat(${GRID_SIZE}, 40px)`,
               border: '4px solid #00ffcc',
               boxShadow: '0 0 20px #00ffcc',
          }}>
               {cells}
          </div>
     );
};

export default Grid;