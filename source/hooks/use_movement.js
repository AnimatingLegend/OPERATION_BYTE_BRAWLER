import { useState, useEffect } from "react";
import { GRID_SIZE } from "../data/constants";
import { SECTOR_ONE } from "../data/levels";

/**
 * Movement logic for the player.
 * @param {*} initalPosition 
 * @param {*} onKeyCollect 
 * @param {*} onBossEncounter 
 * @param {*} isActive
 */
export const useMovement = (initalPosition, onKeyCollect, onBossEncounter, isActive) => {
     const [position, setPosition] = useState(initalPosition);

     /**
      * Handles the event when the player moves.
      * @param {*} directX 
      * @param {*} directY 
      */
     const move = (directX, directY) => {
          // Freeze movement during battle / menus
          if (!isActive) return;

          /**
           * Update the players postion
           * @type {{x: number, y: number}}
           */
          setPosition(prev => {
               const newX = Math.max(0, Math.min(GRID_SIZE - 1, prev.x + directX));
               const newY = Math.max(0, Math.min(GRID_SIZE - 1, prev.y + directY));

               

               /**
                * @todo - Add player collision with walls || @AnimatingLegend
                * @todo - Add key collection and boss encounter detection || @Noah-Ram52
                */
               

               // Movement encounter boss detection - Noah-Ram52
               if (newX, newY) {
                    SECTOR_ONE.boss.x === newX && SECTOR_ONE.boss.y === newY && onBossEncounter();
               }


               return { x: newX, y: newY };
          });
     };

     /**
      * Control handler for the player's movement.
      * @returns {void}
      */
     useEffect(() => {
          // @todo: rework this ENTIRE system
          // @author: @AnimatingLegend
          const controls = (key_event) => {
               switch (key_event.key.toLowerCase()) {
                    case 'w': move(0, -1); break;
                    case 'a': move(-1, 0); break;
                    case 's': move(0, 1); break;
                    case 'd': move(1, 0); break;
                    default: break;
               }
          };

          window.addEventListener('keydown', controls);
          return () => window.removeEventListener('keydown', controls);
     }, [isActive, position]);

     return { position };
};