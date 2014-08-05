/*
 * Copyright (c) 2014 Brian Neisler. http://brianneisler.com
 *
 * evolution-drone may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('evolution.DeviceConnection')

//@Require('Class')
//@Require('Event')
//@Require('EventDispatcher')
//@Require('Obj')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Class               = bugpack.require('Class');
    var Event               = bugpack.require('Event');
    var EventDispatcher     = bugpack.require('EventDispatcher');
    var Obj                 = bugpack.require('Obj');


    //-------------------------------------------------------------------------------
    // Declare Class
    //-------------------------------------------------------------------------------

    /**
     * @class
     * @extends {EventDispatcher}
     */
    var DeviceConnection = Class.extend(EventDispatcher, {

        _name: "evolution.DeviceConnection",


        //-------------------------------------------------------------------------------
        // Constructor
        //-------------------------------------------------------------------------------

        /**
         * @constructs
         * @param {*} hidConnection
         */
        _constructor: function(hidConnection) {

            this._super();


            //-------------------------------------------------------------------------------
            // Private Properties
            //-------------------------------------------------------------------------------

            /**
             * @private
             * @type {*}
             */
            this.hidConnection  = hidConnection;
        },

        /**
         * @private
         */
        _initializer: function() {
            this._super();

            var _this = this;
            this.passDataEvent = function(data) {
                _this.hearConnectionData(data);
            };
            this.passErrorEvent = function(error) {
                _this.hearConnectionError(error);
            }

            this.hidConnection.on("data", this.passDataEvent);
            this.hidConnection.on("error", this.passErrorEvent);
        },

        /**
         * @private
         */
        _deinitializer: function() {
            this.hidConnection.removeListener("data", this.passDataEvent);
            this.hidConnection.removeListener("error", this.passErrorEvent);
        },


        //-------------------------------------------------------------------------------
        // Getters and Setters
        //-------------------------------------------------------------------------------

        /**
         * @return {*}
         */
        getHidConnection: function() {
            return this.hidConnection;
        },


        //-------------------------------------------------------------------------------
        // Event Listeners
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @param {Buffer} data
         */
        hearConnectionData: function(data) {
            console.log("data:", data.toString("hex"));
            this.dispatchEvent(new Event(DeviceConnection.EventTypes.DATA, {
                data: data
            }))
        },

        /**
         * @private
         * @param {Error} error
         */
        hearConnectionError: function(error) {
            this.dispatchEvent(new Event(DeviceConnection.EventTypes.ERROR, {
                error: error
            }));
            console.log("error:", error);
            if (err.message === "could not read from HID device") {
                disconnectFromDevice();
            }
        }
    });


    //-------------------------------------------------------------------------------
    // Static Properties
    //-------------------------------------------------------------------------------

    /**
     * @static
     * @enum {string}
     */
    DeviceConnection.EventTypes = {
        DATA: "DeviceConnection:EventTypes:Data",
        ERROR: "DeviceConnection:EventTypes:Error"
    };


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('evolution.DeviceConnection', DeviceConnection);
});
