/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugcore may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('evolution.Drone')

//@Require('Class')
//@Require('Obj')
//@Require('Proxy')
//@Require('evolution.Device')
//@Require('evolution.DeviceConnection')
//@Require('evolution.DeviceManager')
//@Require('evolution.DeviceService')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Class               = bugpack.require('Class');
    var Obj                 = bugpack.require('Obj');
    var Proxy               = bugpack.require('Proxy');
    var Device              = bugpack.require('evolution.Device');
    var DeviceConnection    = bugpack.require('evolution.DeviceConnection');
    var DeviceManager       = bugpack.require('evolution.DeviceManager');
    var DeviceService       = bugpack.require('evolution.DeviceService');


    //-------------------------------------------------------------------------------
    // Declare Class
    //-------------------------------------------------------------------------------

    /**
     * @class
     * @extends {Obj}
     */
    var Drone = Class.extend(Obj, {

        _name: "evolution.Drone",


        //-------------------------------------------------------------------------------
        // Constructor
        //-------------------------------------------------------------------------------

        /**
         * @constructs
         */
        _constructor: function() {

            this._super();


            //-------------------------------------------------------------------------------
            // Public Properties
            //-------------------------------------------------------------------------------

            /**
             * @type {function(new:Device)}
             */
            this.Device             = Device;

            /**
             * @type {function(new:DeviceConnection)}
             */
            this.DeviceConnection   = DeviceConnection;

            /**
             * @type {function(new:DeviceManager)}
             */
            this.DeviceManager      = DeviceManager;

            /**
             * @type {function(new:DeviceService)}
             */
            this.DeviceService      = DeviceService;
        },


        //-------------------------------------------------------------------------------
        // Public Methods
        //-------------------------------------------------------------------------------

        /**
         * @return {Drone.DeviceService}
         */
        newService: function() {
            return new this.DeviceService();
        }
    });


    //-------------------------------------------------------------------------------
    // Private Static Properties
    //-------------------------------------------------------------------------------

    /**
     * @static
     * @private
     * @type {Drone}
     */
    Drone.instance = null;


    //-------------------------------------------------------------------------------
    // Static Methods
    //-------------------------------------------------------------------------------

    /**
     * @static
     * @return {Drone}
     */
    Drone.getInstance = function() {
        if (Drone.instance === null) {
            Drone.instance = new Drone();
        }
        return Drone.instance;
    };


    //-------------------------------------------------------------------------------
    // Static Proxy
    //-------------------------------------------------------------------------------

    Drone.proxy(Drone, Proxy.method(Drone.getInstance), [
        "newService"
    ]);


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('evolution.Drone', Drone);
});
