'use strict';

var // Determine if we're running on the server
    win = (typeof window !== 'undefined') ? window : null,

    // Store the keys current pressed
    keysPressed = {},

    // Store the state of the mouse
    globalMouseState = null,

    // Stores the position relative to the active layer
    layerMousePosition = {
        x: 0,
        y: 0
    },

    // Contains the position of the game window
    gamePosition = null;

/**
 * Keeps track of all user input
 */
var Input = {
    /**
     * Initializes the event handlers
     * @param {HTMLElement} gameContainer
     * @private
     */
    _init: function(gameContainer) {
        if (!win) {
            return;
        }
        keysPressed = {};

        var rect = gameContainer.getBoundingClientRect();
        gamePosition = {
            x: Math.ceil(rect.left),
            y: Math.ceil(rect.top)
        };

        // Make sure that we only pay attention to the mouse when it's on screen
        gameContainer.addEventListener('mousemove', function(evt) {
            evt.preventDefault();
            globalMouseState = globalMouseState || {
                x: 0,
                y: 0,
                button: null
            };
            globalMouseState.x = evt.clientX - gamePosition.x;
            globalMouseState.y = evt.clientY - gamePosition.y;
        });
        gameContainer.addEventListener('mouseleave', function() {
            globalMouseState = null;
        });
    },
    Mouse: {
        /**
         * Adjusts the mouse position relative to a container
         * @param {DisplayObjectContainer} objectContainer
         */
        setRelativePosition: function(objectContainer) {
            if (globalMouseState) {
                layerMousePosition.x = globalMouseState.x - objectContainer.x;
                layerMousePosition.y = globalMouseState.y - objectContainer.y;
            }
        },

        /**
         * X position
         * @returns {number}
         */
        get X() {
            return (globalMouseState !== null) ? layerMousePosition.x : null;
        },

        /**
         * Y position
         * @returns {number}
         */
        get Y() {
            return (globalMouseState !== null) ? layerMousePosition.y : null;
        }
    },
    Keyboard: {

    },
    Gamepad: {

    }
};

module.exports = Input;