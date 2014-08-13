/*
 * Copyright (c) 2014 Brian Neisler. http://brianneisler.com
 *
 * evolution-drone may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('evolution.Device')

//@Require('Class')
//@Require('Event')
//@Require('EventDispatcher')
//@Require('Obj')
//@Require('evolution.DeviceConnection')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // Common Modules
    //-------------------------------------------------------------------------------

    var hid                 = require('node-hid');


    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Class               = bugpack.require('Class');
    var Event               = bugpack.require('Event');
    var EventDispatcher     = bugpack.require('EventDispatcher');
    var Obj                 = bugpack.require('Obj');
    var DeviceConnection    = bugpack.require('evolution.DeviceConnection');


    //-------------------------------------------------------------------------------
    // Declare Class
    //-------------------------------------------------------------------------------

    /**
     * @class
     * @extends {EventDispatcher}
     */
    var Device = Class.extend(EventDispatcher, {

        _name: "evolution.Device",


        //-------------------------------------------------------------------------------
        // Constructor
        //-------------------------------------------------------------------------------

        /**
         * @constructs
         * @param {{
         *      interface: number,
         *      manufacturer: string,
         *      path: string,
         *      product: string,
         *      productId: string,
         *      release: number,
         *      serialNumber: string,
         *      vendorId: string
         * }} hidDevice
         */
        _constructor: function(hidDevice) {

            this._super();


            //-------------------------------------------------------------------------------
            // Private Properties
            //-------------------------------------------------------------------------------

            /**
             * @private
             * @type {boolean}
             */
            this.connected      = false;

            /**
             * @private
             * @type {DeviceConnection}
             */
            this.connection     = null;

            /**
             * @private
             * @type {{interface: number, manufacturer: string, path: string, product: string, productId: string, release: number, serialNumber: string, vendorId: string}}
             */
            this.hidDevice      = hidDevice;

            /**
             * @private
             * @type {number}
             */
            this.interface      = hidDevice.interface;

            /**
             * @private
             * @type {string}
             */
            this.manufacturer   = hidDevice.manufacturer;

            /**
             * @private
             * @type {string}
             */
            this.path           = hidDevice.path;

            /**
             * @private
             * @type {string}
             */
            this.product        = hidDevice.product;

            /**
             * @private
             * @type {string}
             */
            this.productId      = hidDevice.productId;

            /**
             * @private
             * @type {number}
             */
            this.release        = hidDevice.release;

            /**
             * @private
             * @type {string}
             */
            this.serialNumber   = hidDevice.serialNumber;

            /**
             * @private
             * @type {string}
             */
            this.vendorId       = hidDevice.vendorId;
        },


        //-------------------------------------------------------------------------------
        // Getters and Setters
        //-------------------------------------------------------------------------------

        /**
         * @return {boolean}
         */
        getConnected: function() {
            return this.connected;
        },

        /**
         * @return {DeviceConnection}
         */
        getConnection: function() {
            return this.connection;
        },

        /**
         * @param {DeviceConnection} connection
         */
        setConnection: function(connection) {
            if (this.connection) {
                this.connection.setParentPropagator(null);
                this.connection.removeEventListener(DeviceConnection.EventTypes.ERROR, this.hearDeviceConnectionError, this);
                this.connection = null;
            }
            this.connection = connection;
            if (this.connection) {
                this.connection.setParentPropagator(this);
                this.connection.addEventListener(DeviceConnection.EventTypes.ERROR, this.hearDeviceConnectionError, this);
            }
        },

        /**
         * @return {{interface: number, manufacturer: string, path: string, product: string, productId: string, release: number, serialNumber: string, vendorId: string}}
         */
        getHidDevice: function() {
            return this.hidDevice;
        },

        /**
         * @return {number}
         */
        getInterface: function() {
            return this.interface;
        },

        /**
         * @return {string}
         */
        getManufacturer: function() {
            return this.manufacturer;
        },

        /**
         * @return {string}
         */
        getPath: function() {
            return this.path;
        },

        /**
         * @return {string}
         */
        getProduct: function() {
            return this.product;
        },

        /**
         * @return {string}
         */
        getProductId: function() {
            return this.productId;
        },

        /**
         * @return {number}
         */
        getRelease: function() {
            return this.release;
        },

        /**
         * @return {string}
         */
        getSerialNumber: function() {
            return this.serialNumber;
        },

        /**
         * @return {string}
         */
        getVendorId: function() {
            return this.vendorId;
        },


        //-------------------------------------------------------------------------------
        // Obj Methods
        //-------------------------------------------------------------------------------

        /**
         * @override
         * @param {*} value
         * @return {boolean}
         */
        equals: function(value) {
            if (Class.doesExtend(value, Device)) {
                return (Obj.equals(value.getSerialNumber(), this.serialNumber) && Obj.equals(value.getPath(), this.path));
            }
            return false;
        },

        /**
         * @override
         * @return {number}
         */
        hashCode: function() {
            if (!this._hashCode) {
                this._hashCode = Obj.hashCode("[Device]" +
                    Obj.hashCode(this.serialNumber) + "_" +
                    Obj.hashCode(this.path));
            }
            return this._hashCode;
        },


        //-------------------------------------------------------------------------------
        // Public Methods
        //-------------------------------------------------------------------------------

        /**
         *
         */
        connectToDevice: function() {
            if (!this.connected) {
                this.connected = true;
                var path = this.getPath();
                var connection = new hid.HID(path);
                this.setConnection(new DeviceConnection(connection));
            }
        },

        /**
         *
         */
        disconnectFromDevice: function() {
            if (this.connected) {
                this.connected = false;
                this.getConnection().closeConnection();
                this.clearConnection();
            }
        },


        //-------------------------------------------------------------------------------
        // Private Methods
        //-------------------------------------------------------------------------------

        /**
         * @private
         */
        clearConnection: function() {
            this.getConnection().destroyConnection();
            this.setConnection(null);
        },


        //-------------------------------------------------------------------------------
        // Event Listeners
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @param {DeviceDataEvent} event
         */
        hearDeviceConnectionError: function(event) {
            var error = event.getData().error;
            console.log("error:", error);
            if (error.message === "could not read from HID device") {
                this.clearConnection();
            }
        }
    });


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('evolution.Device', Device);
});

