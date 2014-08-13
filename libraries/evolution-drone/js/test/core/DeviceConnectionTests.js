/*
 * Copyright (c) 2014 Brian Neisler. http://brianneisler.com
 *
 * evolution-drone may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@TestFile

//@Require('Class')
//@Require('bugmeta.BugMeta')
//@Require('bugunit.TestTag')
//@Require('evolution.DeviceConnection')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Class               = bugpack.require('Class');
    var BugMeta             = bugpack.require('bugmeta.BugMeta');
    var TestTag             = bugpack.require('bugunit.TestTag');
    var DeviceConnection    = bugpack.require('evolution.DeviceConnection');


    //-------------------------------------------------------------------------------
    // Simplify References
    //-------------------------------------------------------------------------------

    var bugmeta             = BugMeta.context();
    var test                = TestTag.test;


    //-------------------------------------------------------------------------------
    // Declare Tests
    //-------------------------------------------------------------------------------

    /**
     * This tests
     * 1) Instantiation of a new DeviceConnection
     */
    var deviceConnectionInstantiationTest = {

        // Setup Test
        //-------------------------------------------------------------------------------

        setup: function() {
            this.testHidConnection = {
                on: function(eventType, eventFunction) {

                }
            };
            this.testDeviceConnection = new DeviceConnection(this.testHidConnection);
        },


        // Run Test
        //-------------------------------------------------------------------------------

        test: function(test) {
            test.assertTrue(Class.doesExtend(this.testDeviceConnection, DeviceConnection),
                "Assert instance of DeviceConnection");
            test.assertEqual(this.testDeviceConnection.getClass().getConstructor(), DeviceConnection,
                "Assert #getClass#getConstructor returns DeviceConnection");
            test.assertEqual(this.testDeviceConnection.getHidConnection(), this.testHidConnection,
                "Assert DeviceConnection#getHidConnection returns testHidConnection");
        }
    };


    //-------------------------------------------------------------------------------
    // BugMeta
    //-------------------------------------------------------------------------------

    bugmeta.tag(deviceConnectionInstantiationTest).with(
        test().name("DeviceConnection -  instantiation test")
    );
});
