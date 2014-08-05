/*
 * Copyright (c) 2014 Brian Neisler. http://brianneisler.com
 *
 * evolution-drone may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('evolution.DeviceService')

//@Require('Class')
//@Require('Obj')
//@Require('bugioc.ArgTag')
//@Require('bugioc.IInitializingModule')
//@Require('bugioc.ModuleTag')
//@Require('bugmeta.BugMeta')
//@Require('evolution.DeviceManager')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Class                   = bugpack.require('Class');
    var Obj                     = bugpack.require('Obj');
    var ArgTag                  = bugpack.require('bugioc.ArgTag');
    var IInitializingModule     = bugpack.require('bugioc.IInitializingModule');
    var ModuleTag               = bugpack.require('bugioc.ModuleTag');
    var BugMeta                 = bugpack.require('bugmeta.BugMeta');
    var DeviceManager           = bugpack.require('evolution.DeviceManager');


    //-------------------------------------------------------------------------------
    // Simplify References
    //-------------------------------------------------------------------------------

    var arg                     = ArgTag.arg;
    var bugmeta                 = BugMeta.context();
    var module                  = ModuleTag.module;


    //-------------------------------------------------------------------------------
    // Declare Class
    //-------------------------------------------------------------------------------

    /**
     * @class
     * @extends {Obj}
     * @implements {IInitializingModule}
     */
    var DeviceService = Class.extend(Obj, {

        _name: "evolution.DeviceService",


        //-------------------------------------------------------------------------------
        // Constructor
        //-------------------------------------------------------------------------------

        /**
         * @constructs
         * @param {DeviceManager} deviceManager
         */
        _constructor: function(deviceManager) {

            this._super();


            //-------------------------------------------------------------------------------
            // Private Properties
            //-------------------------------------------------------------------------------

            /**
             * @private
             * @type {DeviceManager}
             */
            this.deviceManager          = deviceManager;
        },


        //-------------------------------------------------------------------------------
        // Getters and Setters
        //-------------------------------------------------------------------------------

        /**
         * @return {DeviceManager}
         */
        getDeviceManager: function() {
            return this.deviceManager;
        },


        //-------------------------------------------------------------------------------
        // IInitializingModule Implementation
        //-------------------------------------------------------------------------------

        /**
         * @param {function(Throwable=)} callback
         */
        deinitializeModule: function(callback) {
            this.deviceManager.removeEventListener(DeviceManager.EventTypes.DEVICE_DETECTED, this.hearDeviceDetected, this);
            this.deviceManager.removeEventListener(DeviceManager.EventTypes.DEVICE_LOST, this.hearDeviceLost, this);
            this.deviceManager.stopScanningForDevices();
            callback();
        },

        /**
         * @param {function(Throwable=)} callback
         */
        initializeModule: function(callback) {
            this.deviceManager.addEventListener(DeviceManager.EventTypes.DEVICE_DETECTED, this.hearDeviceDetected, this);
            this.deviceManager.addEventListener(DeviceManager.EventTypes.DEVICE_LOST, this.hearDeviceLost, this);
            this.deviceManager.startScanningForDevices();
            callback()
        },


        //-------------------------------------------------------------------------------
        // Private Methods
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @param {Device} device
         */
        processDeviceDetected: function(device) {
            device.connectToDevice();
        },

        /**
         * @private
         * @param {Device} device
         */
        processDeviceLost: function(device) {

        },


        //-------------------------------------------------------------------------------
        // Event Listeners
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @param {Event} event
         */
        hearDeviceDetected: function(event) {
            this.processDeviceDetected(event.getData().device);
        },

        /**
         * @private
         * @param {Event} event
         */
        hearDeviceLost: function(event) {
            this.processDeviceLost(event.getData().device);
        }
    });


    //-------------------------------------------------------------------------------
    // Interfaces
    //-------------------------------------------------------------------------------

    Class.implement(DeviceService, IInitializingModule);


    //-------------------------------------------------------------------------------
    // BugMeta
    //-------------------------------------------------------------------------------

    bugmeta.tag(DeviceService).with(
        module("deviceService")
            .args([
                arg().ref("deviceManager")
            ])
    );


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('evolution.DeviceService', DeviceService);
});

