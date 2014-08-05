/*
 * Copyright (c) 2014 Brian Neisler. http://brianneisler.com
 *
 * evolution-drone may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('evolution.DeviceManager')

//@Require('Class')
//@Require('Collections')
//@Require('Event')
//@Require('EventDispatcher')
//@Require('Obj')
//@Require('Set')
//@Require('bugioc.IInitializingModule')
//@Require('bugioc.ModuleTag')
//@Require('bugmeta.BugMeta')
//@Require('evolution.Device')


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
    var Collections         = bugpack.require('Collections');
    var Event               = bugpack.require('Event');
    var EventDispatcher     = bugpack.require('EventDispatcher');
    var Obj                 = bugpack.require('Obj');
    var Set                 = bugpack.require('Set');
    var ModuleTag           = bugpack.require('bugioc.ModuleTag');
    var BugMeta             = bugpack.require('bugmeta.BugMeta');
    var Device              = bugpack.require('evolution.Device');


    //-------------------------------------------------------------------------------
    // Simplify References
    //-------------------------------------------------------------------------------

    var bugmeta             = BugMeta.context();
    var module              = ModuleTag.module;


    //-------------------------------------------------------------------------------
    // Declare Class
    //-------------------------------------------------------------------------------

    /**
     * @class
     * @extends {EventDispatcher}
     */
    var DeviceManager = Class.extend(EventDispatcher, {

        _name: "evolution.DeviceManager",


        //-------------------------------------------------------------------------------
        // Constructor
        //-------------------------------------------------------------------------------

        /**
         * @constructs
         */
        _constructor: function() {

            this._super();


            //-------------------------------------------------------------------------------
            // Private Properties
            //-------------------------------------------------------------------------------

            /**
             * @private
             * @type {Set.<Device>}
             */
            this.foundDevices           = Collections.set();

            /**
             * @private
             * @type {boolean}
             */
            this.scanning               = false;

            /**
             * @private
             * @type {number}
             */
            this.scanningIntervalId     = null;
        },


        //-------------------------------------------------------------------------------
        // Getters and Setters
        //-------------------------------------------------------------------------------

        /**
         * @return {Set.<Device>}
         */
        getFoundDevices: function() {
            return this.foundDevices;
        },


        //-------------------------------------------------------------------------------
        // Public Methods
        //-------------------------------------------------------------------------------

        /**
         *
         */
        startScanningForDevices: function() {
            var _this = this;
            if (!this.scanning) {
                this.scanning = true;
                this.scanningIntervalId = setInterval(function() {
                    _this.doScanForDevices();
                }, 2000);
                this.doScanForDevices();
            }
        },

        /**
         *
         */
        stopScanningForDevices: function() {
            var _this = this;
            if (this.scanning) {
                this.scanning = false;
                clearInterval(this.scanningIntervalId);
            }
        },


        //-------------------------------------------------------------------------------
        // Private Methods
        //-------------------------------------------------------------------------------

        /**
         * @private
         */
        doScanForDevices: function() {
            var _this = this;
            var deviceFound = false;
            console.log("Scanning for devices..");
            var deviceSet   = this.findDevices();
            deviceSet.forEach(function(device) {
                if (device.getProduct() === "Drone") {
                    if (!_this.foundDevices.contains(device)) {
                        console.log("Device found! path:", device.getPath());
                        deviceFound = true;
                        _this.processDeviceFound(device);
                    }
                }
            });

            if (!deviceFound) {
                console.log("No new devices found");
            }
        },

        /**
         * @private
         * @return {Set.<Device>}
         */
        findDevices: function() {
            var devices = hid.devices();
            return Collections.ensureStreamable(devices)
                .stream()
                .map(function(device) {
                    return new Device(device);
                })
                .collectSync(Set);
        },

        /**
         * @private
         * @return {Device}
         */
        processDeviceFound: function(device) {
            this.foundDevices.add(device);
            this.dispatchEvent(new Event(DeviceManager.EventTypes.DEVICE_DETECTED, {
                device: device
            }));
        }

        //-------------------------------------------------------------------------------
        // Event Listeners
        //-------------------------------------------------------------------------------


    });


    //-------------------------------------------------------------------------------
    // Static Properties
    //-------------------------------------------------------------------------------

    /**
     * @static
     * @enum {string}
     */
    DeviceManager.EventTypes = {
        DEVICE_DETECTED: "DeviceManager:EventTypes:DeviceDetected",
        DEVICE_LOST: "DeviceManager:EventTypes:DeviceLost"
    };


    //-------------------------------------------------------------------------------
    // BugMeta
    //-------------------------------------------------------------------------------

    bugmeta.tag(DeviceManager).with(
        module("deviceManager")
    );


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('evolution.DeviceManager', DeviceManager);
});

