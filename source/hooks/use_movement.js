import { useState } from "react";
import { GRID_SIZE } from "../data/constants";
import { SECTOR_ONE } from "../data/levels";

/**
 * Movement logic for the player.
 * @param {*} initalPosition 
 * @param {*} onKeyCollect 
 * @param {*} onBossEncounter 
 */
export const useMovement = (initalPosition, onKeyCollect, onBossEncounter) => {
     const [position, setPosition] = useState(initalPosition);

     /**
      * Sets the player's position.
      * @param {*} directX 
      * @param {*} directY 
      */
     const move = (directX, directY) => {
          const newX = Math.max(0, Math.min(GRID_SIZE - 1, position.x + directX));
          const newY = Math.max(0, Math.min(GRID_SIZE - 1, position.y + directY));

          /**
           * TODO, Add the following:
           * @todo - Player collision with walls
           * @todo - Boss Encounter
           * @todo - Key Collection
           *
           * @author @Noah-Ram52
           */

          setPosition({ x: newX, y: newY });
     };

     return { position, move };
};