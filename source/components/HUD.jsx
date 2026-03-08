import React from 'react';

/**
 * HUD Component that displays the player's health, and the amount of keys they collected.
 * @type {Object} props - The properties passed to the HUD component.
 * @property {number} health - The player's current health.
 * @property {number} keysCollected - The number of keys the player has collected.
 * @property {Array} logs - The list of log messages to display.
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * @todo - Implement the CSS styling for the HUD.
 * @author @F4LDR
 */
const HUD = ({ health, keysCollected, logs }) => (
     <div /** ~~ CSS STYLING GOES HERE ~~ **/>
          <h3>DEBUGGER_OS</h3>
          <div /** ~~ CSS STYLING GOES HERE ~~ **/>
               <p>HEALTH: {health}</p>
               <p>DATA_KEYS: {keysCollected}</p>
          </div>
          <div /** ~~ CSS STYLING GOES HERE ~~ **/>
               {logs.slice(0, 5).map((log, index) => <div key={index}>{log}</div>)}
          </div>
     </div>
);

export default HUD;