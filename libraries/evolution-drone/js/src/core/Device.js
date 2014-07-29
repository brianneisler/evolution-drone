/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugcore may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('Drone')

//@Require('Class')
//@Require('Map')
//@Require('Obj')
//@Require('ObjectUtil')
//@Require('TypeUtil')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Class       = bugpack.require('Class');
    var Map         = bugpack.require('Map');
    var Obj         = bugpack.require('Obj');
    var ObjectUtil  = bugpack.require('ObjectUtil');
    var TypeUtil    = bugpack.require('TypeUtil');


    //-------------------------------------------------------------------------------
    // Declare Class
    //-------------------------------------------------------------------------------

    /**
     * @class
     * @extends {Obj}
     */





var Device = Class.extend(EventDispatcher, {

    _name: "drone.Device",


    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(device) {

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
         * @type {number}
         */
        this.interface      = device.interface;

        /**
         * @private
         * @type {string}
         */
        this.manufacturer   = device.manufacturer;

        /**
         * @private
         * @type {string}
         */
        this.path           = device.path;

        /**
         * @private
         * @type {string}
         */
        this.product        = device.product;

        /**
         * @private
         * @type {string}
         */
        this.productId      = device.productId;

        /**
         * @private
         * @type {number}
         */
        this.release        = device.release;

        /**
         * @private
         * @type {string}
         */
        this.serialNumber   = device.serialNumber;

        /**
         * @private
         * @type {string}
         */
        this.vendorId       = device.vendorId;
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

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
            this.connection = null;
        }
        this.connection = connection;
        if (this.connection) {
            this.connection.setParentPropagator(this);
        }
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
    getSerialNumber: function() {
        return this.serialNumber;
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
            var connection = new HID.HID(path);

            //TODO BRN: Wrap connection in a new class called DeviceConnection
            this.setConnection(new DeviceConnection(connection));
        }
    },

    /**
     *
     */
    disconnectFromDevice: function() {
        if (this.connected) {
            this.connected = false;
            this.getConnection().removeListener("data");
            this.getConnection().removeListener("error");
            this.setConnection(null);
        }
    }
});



    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('evolution.Drone', Drone);
});

