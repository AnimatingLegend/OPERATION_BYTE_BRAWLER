import React from "react";
import { ENTITY_TYPES } from "../data/constants";

const Cell = ({ type }) => {
     /**
      * Cell component representing each grid cell. It can be a wall, empty space, key, or boss.
      * @type {Object} props - The properties passed to the Cell component.
      * @property {string} type - The type of the cell (e.g., wall, empty, key, boss).
      * =================================================
      * @todo - Change the CSS values, aswell as the color scheme to fit the theme of the game.
      * @author @F4LDR
      */
     const styles = {
          width: '40px', height: '40px', border: '1px solid #003333',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '20px',
          backgroundColor: type === ENTITY_TYPES.WALL ? '#111' : 'transparent'
     };

     /**
      * Returns the dedicated icon for the cell type.
      * @type {string} - The icon that matches the cell type.
      */
     const getIcon = () => {
          /**
           * @todo - Add icons for each entity type
           * @author @F4LDR
           */
          switch (type) {
               case ENTITY_TYPES.PLAYER: return '';
               case ENTITY_TYPES.KEY: return '';
               case ENTITY_TYPES.BOSS: return '';
               case ENTITY_TYPES.WALL: return '';
               default: return '';
          }
     };

     return <div style={styles}>{getIcon()}</div>;
};

export default Cell;