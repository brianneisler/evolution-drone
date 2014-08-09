/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugcore may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@TestFile

//@Require('Class')
//@Require('bugmeta.BugMeta')
//@Require('bugunit.TestTag')
//@Require('evolution.DeviceDataEvent')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Class       = bugpack.require('Class');
    var BugMeta     = bugpack.require('bugmeta.BugMeta');
    var TestTag     = bugpack.require('bugunit.TestTag');
    var DeviceDataEvent = bugpack.require('evolution.DeviceDataEvent');


    //-------------------------------------------------------------------------------
    // Simplify References
    //-------------------------------------------------------------------------------

    var bugmeta     = BugMeta.context();
    var test        = TestTag.test;


    //-------------------------------------------------------------------------------
    // Declare Tests
    //-------------------------------------------------------------------------------

    /**
     * This tests
     * 1) Instantiation of a new DeviceDataEvent with event type arg only
     */
    var deviceDataEventInstantiationTest = {

        // Setup Test
        //-------------------------------------------------------------------------------

        setup: function() {
            this.testDeviceDataEvent = new DeviceDataEvent(DeviceDataEvent.EventTypes.DATA);
        },


        // Run Test
        //-------------------------------------------------------------------------------

        test: function(test) {
            test.assertTrue(Class.doesExtend(this.testDeviceDataEvent, DeviceDataEvent),
                "Assert instance of DeviceDataEvent");
            test.assertEqual(this.testDeviceDataEvent.getClass().getConstructor(), DeviceDataEvent,
                "Assert #getClass#getConstructor returns DeviceDataEvent");
            test.assertEqual(this.testDeviceDataEvent.getType(), DeviceDataEvent.EventTypes.DATA,
                "Assert DeviceDataEvent#getType returns DeviceDataEvent.EventTypes.DATA");
            test.assertEqual(this.testDeviceDataEvent.getData(), undefined,
                "Assert DeviceDataEvent#getData returns undefined");
        }
    };

    /**
     * This tests
     * 1) Instantiation of a new DeviceDataEvent with data
     * 2) All convenience methods of DeviceDataEvent
     */
    var deviceDataEventInstantiationWithDataTest = {

        // Setup Test
        //-------------------------------------------------------------------------------

        setup: function() {
            this.testData = {
                a: true,
                b: false,
                x: true,
                y: false,
                lb: true,
                rb: false,
                lt: true,
                rt: false,
                select: true,
                start: false,
                dup: true,
                dleft: false,
                dright: false,
                ddown: false,
                leftStick: {
                    x: 100,
                    y: 100,
                    pressed: false
                },
                rightStick: {
                    x: -100,
                    y: -100,
                    pressed: true
                }
            };
            this.testDeviceDataEvent = new DeviceDataEvent(DeviceDataEvent.EventTypes.DATA, this.testData);
        },


        // Run Test
        //-------------------------------------------------------------------------------

        test: function(test) {
            test.assertEqual(this.testDeviceDataEvent.getData(), this.testData,
                "Assert DeviceDataEvent#getData returns testData");
            test.assertEqual(this.testDeviceDataEvent.getLeftStick(), this.testData.leftStick,
                "Assert DeviceDataEvent#getLeftStick returns testData.leftStick");
            test.assertEqual(this.testDeviceDataEvent.getLeftStickX(), this.testData.leftStick.x,
                "Assert DeviceDataEvent#getLeftStickX returns testData.leftStick.x");
            test.assertEqual(this.testDeviceDataEvent.getLeftStickY(), this.testData.leftStick.y,
                "Assert DeviceDataEvent#getLeftStickY returns testData.leftStick.y");
            test.assertEqual(this.testDeviceDataEvent.getRightStick(), this.testData.rightStick,
                "Assert DeviceDataEvent#getRightStick returns testData.rightStick");
            test.assertEqual(this.testDeviceDataEvent.getRightStickX(), this.testData.rightStick.x,
                "Assert DeviceDataEvent#getRightStickX returns testData.rightStick.x");
            test.assertEqual(this.testDeviceDataEvent.getRightStickY(), this.testData.rightStick.y,
                "Assert DeviceDataEvent#getRightStickY returns testData.rightStick.y");
            test.assertEqual(this.testDeviceDataEvent.isAButtonPressed(), this.testData.a,
                "Assert DeviceDataEvent#isAButtonPressed returns testData.a");
            test.assertEqual(this.testDeviceDataEvent.isBButtonPressed(), this.testData.b,
                "Assert DeviceDataEvent#isBButtonPressed returns testData.b");
            test.assertEqual(this.testDeviceDataEvent.isDirectionDownPressed(), this.testData.ddown,
                "Assert DeviceDataEvent#isDirectionDownPressed returns testData.ddown");
            test.assertEqual(this.testDeviceDataEvent.isDirectionLeftPressed(), this.testData.dleft,
                "Assert DeviceDataEvent#isDirectionLeftPressed returns testData.dleft");
            test.assertEqual(this.testDeviceDataEvent.isDirectionRightPressed(), this.testData.dright,
                "Assert DeviceDataEvent#isDirectionRightPressed returns testData.dright");
            test.assertEqual(this.testDeviceDataEvent.isDirectionUpPressed(), this.testData.dup,
                "Assert DeviceDataEvent#isDirectionUpPressed returns testData.dup");
            test.assertEqual(this.testDeviceDataEvent.isLeftBumperPressed(), this.testData.lb,
                "Assert DeviceDataEvent#isLeftBumperPressed returns testData.lb");
            test.assertEqual(this.testDeviceDataEvent.isLeftStickPressed(), this.testData.leftStick.pressed,
                "Assert DeviceDataEvent#isLeftStickPressed returns testData.leftStick.pressed");
            test.assertEqual(this.testDeviceDataEvent.isLeftTriggerPressed(), this.testData.lt,
                "Assert DeviceDataEvent#isLeftTriggerPressed returns testData.lt");
            test.assertEqual(this.testDeviceDataEvent.isRightBumperPressed(), this.testData.rb,
                "Assert DeviceDataEvent#isRightBumperPressed returns testData.rb");
            test.assertEqual(this.testDeviceDataEvent.isRightStickPressed(), this.testData.rightStick.pressed,
                "Assert DeviceDataEvent#isRightStickPressed returns testData.rightStick.pressed");
            test.assertEqual(this.testDeviceDataEvent.isRightTriggerPressed(), this.testData.rt,
                "Assert DeviceDataEvent#isRightTriggerPressed returns testData.rt");
            test.assertEqual(this.testDeviceDataEvent.isSelectButtonPressed(), this.testData.select,
                "Assert DeviceDataEvent#isSelectButtonPressed returns testData.select");
            test.assertEqual(this.testDeviceDataEvent.isStartButtonPressed(), this.testData.start,
                "Assert DeviceDataEvent#isStartButtonPressed returns testData.start");
            test.assertEqual(this.testDeviceDataEvent.isXButtonPressed(), this.testData.x,
                "Assert DeviceDataEvent#isXButtonPressed returns testData.x");
            test.assertEqual(this.testDeviceDataEvent.isYButtonPressed(), this.testData.y,
                "Assert DeviceDataEvent#isYButtonPressed returns testData.y");
        }
    };
    

    //-------------------------------------------------------------------------------
    // BugMeta
    //-------------------------------------------------------------------------------

    bugmeta.tag(deviceDataEventInstantiationTest).with(
        test().name("DeviceDataEvent -  instantiation test")
    );
    bugmeta.tag(deviceDataEventInstantiationWithDataTest).with(
        test().name("DeviceDataEvent -  instantiation with data test")
    );
});
