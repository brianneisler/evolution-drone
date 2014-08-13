/*
 * Copyright (c) 2014 Brian Neisler. http://brianneisler.com
 *
 * evolution-drone may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('evolution.DeviceDataEvent')

//@Require('Class')
//@Require('Event')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Class   = bugpack.require('Class');
    var Event   = bugpack.require('Event');


    //-------------------------------------------------------------------------------
    // Declare Class
    //-------------------------------------------------------------------------------

    /**
     * @class
     * @extends {Event}
     */
    var DeviceDataEvent = Class.extend(Event, /** @lends {DeviceDataEvent.prototype} */{

        _name: "evolution.DeviceDataEvent",


        //-------------------------------------------------------------------------------
        // Convenience Methods
        //-------------------------------------------------------------------------------

        /**
         * @return {{
         *      a: boolean,
         *      b: boolean,
         *      x: boolean,
         *      y: boolean,
         *      lb: boolean,
         *      rb: boolean,
         *      lt: boolean,
         *      rt: boolean,
         *      select: boolean,
         *      start: boolean,
         *      dup: boolean,
         *      dleft: boolean,
         *      dright: boolean,
         *      ddown: boolean,
         *      leftStick: {
         *          x: number,
         *          y: number,
         *          pressed: boolean
         *      },
         *      rightStick: {
         *          x: number,
         *          y: number,
         *          pressed: boolean
         *      }
         * }}
         */
        getData: function() {
            return this._super();
        },

        /**
         * @returns {{
         *      x: number,
         *      y: number,
         *      pressed: boolean
         * }}
         */
        getLeftStick: function() {
            return this.data.leftStick;
        },

        /**
         * @returns {number}
         */
        getLeftStickX: function() {
            return this.data.leftStick.x;
        },

        /**
         * @returns {number}
         */
        getLeftStickY: function() {
            return this.data.leftStick.y;
        },

        /**
         * @returns {{
         *      x: number,
         *      y: number,
         *      pressed: boolean
         * }}
         */
        getRightStick: function() {
            return this.data.rightStick;
        },

        /**
         * @returns {number}
         */
        getRightStickX: function() {
            return this.data.rightStick.x;
        },

        /**
         * @returns {number}
         */
        getRightStickY: function() {
            return this.data.rightStick.y;
        },

        /**
         * @return {boolean}
         */
        isAButtonPressed: function() {
            return this.data.a;
        },

        /**
         * @return {boolean}
         */
        isBButtonPressed: function() {
            return this.data.b;
        },

        /**
         * @return {boolean}
         */
        isDirectionDownPressed: function() {
            return this.data.ddown;
        },

        /**
         * @return {boolean}
         */
        isDirectionLeftPressed: function() {
            return this.data.dleft;
        },

        /**
         * @return {boolean}
         */
        isDirectionRightPressed: function() {
            return this.data.dright;
        },

        /**
         * @return {boolean}
         */
        isDirectionUpPressed: function() {
            return this.data.dup;
        },

        /**
         * @return {boolean}
         */
        isLeftBumperPressed: function() {
            return this.data.lb;
        },

        /**
         * @return {boolean}
         */
        isLeftStickPressed: function() {
            return this.data.leftStick.pressed;
        },

        /**
         * @return {boolean}
         */
        isLeftTriggerPressed: function() {
            return this.data.lt;
        },

        /**
         * @return {boolean}
         */
        isRightBumperPressed: function() {
            return this.data.rb;
        },

        /**
         * @return {boolean}
         */
        isRightStickPressed: function() {
            return this.data.rightStick.pressed;
        },

        /**
         * @return {boolean}
         */
        isRightTriggerPressed: function() {
            return this.data.rt;
        },

        /**
         * @return {boolean}
         */
        isSelectButtonPressed: function() {
            return this.data.select;
        },

        /**
         * @return {boolean}
         */
        isStartButtonPressed: function() {
            return this.data.start;
        },

        /**
         * @return {boolean}
         */
        isXButtonPressed: function() {
            return this.data.x;
        },

        /**
         * @return {boolean}
         */
        isYButtonPressed: function() {
            return this.data.y;
        }
    });


    //-------------------------------------------------------------------------------
    // Static Properties
    //-------------------------------------------------------------------------------

    /**
     * @static
     * @enum {string}
     */
    DeviceDataEvent.EventTypes = {
        DATA: "DeviceDataEvent:EventTypes:Data"
    };


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('evolution.DeviceDataEvent', DeviceDataEvent);
});
