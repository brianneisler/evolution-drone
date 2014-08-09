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
//@Require('evolution.DeviceDataEvent')


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
    var DeviceDataEvent     = bugpack.require('evolution.DeviceDataEvent');


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
            };

            this.hidConnection.on("data", this.passDataEvent);
            this.hidConnection.on("error", this.passErrorEvent);
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
        // Public Methods
        //-------------------------------------------------------------------------------

        /**
         *
         */
        closeConnection: function() {
            this.hidConnection.close();
        },

        /**
         *
         */
        destroy: function() {
            this.hidConnection.removeListener("data", this.passDataEvent);
            this.hidConnection.removeListener("error", this.passErrorEvent);
        },


        //-------------------------------------------------------------------------------
        // Private Methods
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @param {string} hexString
         * @return {{
         *      a: boolean,
         *      b: boolean,
         *      x: boolean,
         *      y: boolean
         * }}
         */
        convertHexToDataObject: function(hexString) {
            var hex4 = hexString[4];
            var hex5 = hexString[5];
            var hex6 = hexString[6];
            var hex7 = hexString[7];
            var hex8 = hexString[8];
            var hex9 = hexString[9];
            var hex10 = hexString[10];
            var hex11 = hexString[11];
            var hex13 = hexString[13];
            var hex14 = hexString[14];
            var hex15 = hexString[15];
            var hex16 = hexString[16];
            var hex17 = hexString[17];

            var leftStickX = parseInt(hex4 + hex5, 16);
            if (leftStickX >= 128) {
                leftStickX = leftStickX - 256;
            }

            var leftStickY = parseInt(hex6 + hex7, 16);
            if (leftStickY >= 128) {
                leftStickY = -(leftStickY - 256);
            }

            var rightStickX = parseInt(hex8 + hex9, 16);
            if (rightStickX >= 128) {
                rightStickX = rightStickX - 256;
            }

            var rightStickY = parseInt(hex10 + hex11, 16);
            if (rightStickY >= 128) {
                rightStickY = -(rightStickY - 256);
            }

            return {
                a: hex15 === "1" || hex15 === "3" || hex15 === "9" || hex15 === "b",
                b: hex15 === "2" || hex15 === "3" || hex15 === "a" || hex15 === "b",
                x: hex15 === "8" || hex15 === "9" || hex15 === "a" || hex15 === "b",
                y: hex14 === "1" || hex14 === "5" || hex14 === "9" || hex14 === "d",
                lb: hex14 === "4" || hex14 === "5" || hex14 === "c" || hex14 === "d",
                rb: hex14 === "8" || hex14 === "9" || hex14 === "c" || hex14 === "d",
                lt: hex17 === "1" || hex17 === "3" || hex17 === "5" || hex17 === "7" || hex17 === "9" || hex17 === "b",
                rt: hex17 === "2" || hex17 === "3" || hex17 === "6" || hex17 === "7" || hex17 === "a" || hex17 === "b",
                select: hex17 === "4" || hex17 === "5" || hex17 === "6" || hex17 === "7",
                start: hex17 === "8" || hex17 === "9" || hex17 === "a" || hex17 === "b",
                dup: hex13 === "0",
                dleft: hex13 === "6",
                dright: hex13 === "2",
                ddown: hex13 === "4",
                leftStick: {
                    x: leftStickX,
                    y: leftStickY,
                    pressed: hex16 === "2" || hex16 === "6"
                },
                rightStick: {
                    x: rightStickX,
                    y: rightStickY,
                    pressed: hex16 === "4" || hex16 === "6"
                }
            };
        },


        //-------------------------------------------------------------------------------
        // Event Listeners
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @param {Buffer} data
         */
        hearConnectionData: function(data) {
            var dataObject = this.convertHexToDataObject(data.toString("hex"));
            this.dispatchEvent(new DeviceDataEvent(DeviceDataEvent.EventTypes.DATA, dataObject));
        },

        /**
         * @private
         * @param {Error} error
         */
        hearConnectionError: function(error) {
            this.dispatchEvent(new Event(DeviceConnection.EventTypes.ERROR, {
                error: error
            }));
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
        ERROR: "DeviceConnection:EventTypes:Error"
    };


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('evolution.DeviceConnection', DeviceConnection);
});
