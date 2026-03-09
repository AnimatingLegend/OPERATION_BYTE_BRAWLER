import { useState } from 'react';
import { useMovement } from './hooks/use_movement';
import { DATA_KEYS, INITIAL_HEALTH, PLAYER_START } from './data/constants';
import { SECTOR_ONE } from './data/levels';
import Grid from './components/Grid';
import HUD from './components/HUD';

/**
* @todo: Implement health/data_keys, logging, and player controls.
* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
* ASSIGNMENTS
* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
* Health - @F4LDR
* Player Controls - @Noah-Ram52
*/

export default function App() {
     /**
      * The data keys that the player needs to collect before facing the boss.
      * @type {Array}
      */
     const [keys, setKeys] = useState(SECTOR_ONE.keys);

     /**
      * The objectives that the player must complete before winning the game.
      * @type {Array}
      */
     const [logs, setLogs] = useState(['RPG Is Initialized.']);

     /**
      * Whether the player is currently in a battle with the boss.
      */
     const [isBattle, setIsBattle] = useState(false);

     /**
      * Adds a message to the game log.
      * @param {string} message - The message to add to the log.
      */
     const addLog = (message) => setLogs(prevLogs => [message, ...prevLogs]);

     /**
      * Handles the event when the player collects a key.
      * @param {number} x - X position of the player.
      * @param {number} y - Y position of the player.
      */
     const onKeysCollected = (x, y) => {
          const keysExists = keys.filter(key => key.x === x && key.y === y);

          if (keysExists) {
               setKeys(prev => prev.filter(key => key !== keysExists));
               addLog(`Collected a key at (${x}, ${y})!`);
          }
     };

     /**
      * Handles the event when the player encounters the boss. The player can only battle the boss if they have collected all keys.
      * @returns {void}
      */
     const onBossEncounter = () => {
          if (keys.length === 0) setIsBattle(true);
          else addLog(`You need to collect all keys before facing the boss! ${keys.length} remaining.`);
     };

     /**
      * The player's current position is managed by `useMovement`, which also handles the logic for collecting keys and encountering the boss.
      * @returns {Object} The player's current position on the grid.
      */
     const { position } = useMovement(PLAYER_START, onKeysCollected, onBossEncounter);
     
     /**
      * The entire playstate.
      * - Player Controls / Combat
      * - Boss Fight
      * - The Entire HUD.
      * @returns {JSX.Element} The entire game
      */
     return (
          <div style={{
               backgroundColor: '#050505',
               height: '100vh',
               display: 'flex', justifyContent: 'center', alignItems: 'center',
               fontFamily: 'monospace'                          
          }}>
               <HUD health={INITIAL_HEALTH} keys={DATA_KEYS - keys.length} logs={logs} />
               <div style={{ textAlign: 'center' }}>
                    <Grid playerPos={position} keys={keys} />
                    <div style={{ marginTop: '20px' }}>
                         {/** ~~ PLAYER CONTROLS GO HERE @Noah-Ram52 ~~ **/}
                    </div>
               </div>
               {isBattle && (
                    <div>
                         <h1>DEFEAT THE BOSS!</h1>
                    </div>
               )}
          </div>
     );
};