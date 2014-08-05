/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugcore may be freely distributed under the MIT license.
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

        _name: "DeviceDataEvent",


        //-------------------------------------------------------------------------------
        // Constructor
        //-------------------------------------------------------------------------------

        /**
         * @constructs
         * @param {string} type
         * @param {{}} data
         */
        _constructor: function(type, data) {

            this._super(type, data);


            //-------------------------------------------------------------------------------
            // Private Properties
            //-------------------------------------------------------------------------------

            /**
             * @private
             * @type {string}
             */
            this.currentState   = currentState;

            /**
             * @private
             * @type {string}
             */
            this.previousState  = previousState;
        },


        //-------------------------------------------------------------------------------
        // Getters and Setters
        //-------------------------------------------------------------------------------

        /**
         * @return {string}
         */
        getCurrentState: function() {
            return this.currentState;
        },

        /**
         * @return {string}
         */
        getPreviousState: function() {
            return this.previousState;
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
