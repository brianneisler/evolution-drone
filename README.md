# evolution-drone

evolution-drone is a node JS library for interfacing with
[Evolution Controller's Drone gamepad](http://www.evolutioncontrollers.com/).

This library provides a basic DeviceManager that continuously scans for Drone devices.
Once a device is detected, an event will be dispatched that contains the new Device
instance. You can then use this instance to connect to the Drone controller.

After you connect to a Device, that instance will then emit DeviceDataEvents that contain
details of how the controller is being used.

This library is a work in progress and a side hobby of mine. If you have interest in
contributing or specific requests, please feel free to open up an issue on github and
I will get back to you.

Latest Version `0.0.4`

NOTE: This documentation is still being written. If you click on a link and it
doesn't go anywhere, it's likely because that portion of the docs hasn't been
written yet. If there are parts of the docs you'd like us to focus on, feel
free to ask!


## Quick Examples

Using DeviceManager
```javascript
var evolution  = require('evolution-drone');

var DeviceManager   = evolution.DeviceManager;

var myDeviceManager = new DeviceManager();
myDeviceManager.addEventListener(DeviceManager.EventTypes.DEVICE_DETECTED, function(event) {
    var device = event.getData().device;

    // Use device!
});

myDeviceManager.addEventListener(DeviceManager.EventTypes.DEVICE_LOST, function(event) {
    var device = event.getData().device;

    // Device was lost, do what you must....
});

myDeviceManager.startScanningForDevices();
```

Connecting to a Device and listening for DeviceDataEvents
```javascript
var evolution       = require('evolution-drone');
var DeviceDataEvent = evolution.DeviceDataEvent;
var DeviceManager   = evolution.DeviceManager;


var myDeviceManager = new DeviceManager();
myDeviceManager.addEventListener(DeviceManager.EventTypes.DEVICE_DETECTED, function(event) {
    var device = event.getData().device;
    device.addEventListener(DeviceDataEvent.EventTypes.DATA, function(event) {
        console.log(event.getData());
    });
    device.connectToDevice();
});
myDeviceManager.startScanningForDevices();
```


## Dependencies

evolution-drone is dependent upon the following libraries
* [bugcore](https://github.com/airbug/bugcore)
* [bugpack](https://github.com/airbug/bugpack)
* [node-hid](https://github.com/node-hid/node-hid)


## Download Source

The source is available for download from [GitHub](https://github.com/brianneisler/evolution-drone)


## Install

For node js, you can install using Node Package Manager [npm](https://www.npmjs.org/package/evolution-drone)

    npm install evolution-drone


## Usage

In node js:

npm will install the bugcore, bugpack, and node-hide dependencies

```javascript
var drone = require('evolution-drone');


```


## Documentation

### Classes

* [`Device`](#Device)
* [`DeviceConnection`](#DeviceConnection)
* [`DeviceDataEvent`](#DeviceDataEvent)
* [`DeviceManager`](#DeviceManager)
* [`DeviceService`](#DeviceService)



<br /><a name="Device" />
## Device

Class used to represent a detected Drone device.


__Class__

```javascript
/**
 * @class
 * @extends {EventDispatcher}
 */
var Device = Class.extend(EventDispatcher, {

    _name: "evolution.Device",
```
[View code](https://github.com/brianneisler/evolution-drone/blob/v0.0.4/libraries/evolution-drone/js/src/core/Device.js)


__Extends__

* [`EventDispatcher`](https://github.com/airbug/bugcore#EventDispatcher)


__Constructor Summary__

Access | Signature
--- | ---
constructor | <code>[Device](#Device_constructor)({{interface: number, manufacturer: string, path: string, product: string, productId: string, release: number, serialNumber: string, vendorId: string}} hidDevice)</code>


__Getters and Setters Summary__

Access | Signature | Return Type
--- | --- | ---
public | <code>[getConnected](#Device_getConnected)()</code> | <code>{boolean}</code>
public | <code>[getConnection](#Device_getConnection)()</code> | <code>{[DeviceConnection](#DeviceConnection)}</code>
public | <code>[setConnection](#Device_setConnection)({[DeviceConnection](#DeviceConnection)} deviceConnection)</code> | None
public | <code>[getInterface](#Device_getInterface)()</code> | <code>{number}</code>
public | <code>[getManufacturer](#Device_getManufacturer)()</code> | <code>{string}</code>
public | <code>[getPath](#Device_getPath)()</code> | <code>{string}</code>
public | <code>[getProduct](#Device_getProduct)()</code> | <code>{string}</code>
public | <code>[getProductId](#Device_getProductId)()</code> | <code>{string}</code>
public | <code>[getRelease](#Device_getRelease)()</code> | <code>{number}</code>
public | <code>[getSerialNumber](#Device_getSerialNumber)()</code> | <code>{string}</code>
public | <code>[getVendorId](#Device_getVendorId)()</code> | <code>{string}</code>


__Method Summary__

Access | Signature | Return Type
--- | --- | ---
public | <code>[connectToDevice](#Device_connectToDevice)()</code> | None
public | <code>[disconnectFromDevice](#Device_disconnectFromDevice)()</code> | None


<br />
------------------------------------------------------------------------------------
<br />

<a name="Device_constructor" />
### Device(hidDevice)

The constructor for a Device


__Method__

```javascript
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
```


__Parameters__

Name | Type | Description
--- | --- | ---
`hidDevice` | <code>{{interface: number, manufacturer: string, path: string, product: string, productId: string, release: number, serialNumber: string, vendorId: string}}</code> | The hid device that was output by node-hid


__Examples__

Instantiating a Device using node-hid
```js
var hid         = require('node-hid');
var devices     = hid.devices();
var myDevice    = new Device(devices[0]);
```

<br />
------------------------------------------------------------------------------------
<br />

<a name="Device_getConnected" />
### Device#getConnected()

Get whether or not a connection is open with this Device


__Method__

```javascript
/**
 * @return {boolean}
 */
getConnected: function() {
```

__Parameters__

* None


__Returns__

* <code>{boolean}</code> - Whether or not a connection is open with the Device.


__Examples__

```javascript
var myDevice    = new Device(devices[0]);
myDevice.getConnected();    // false, Devices do not automatically have a connection open when they're detected.
```


<br />
------------------------------------------------------------------------------------
<br />

<a name="Device_getConnection" />
### Device#getConnection()

Get the connection open with this Device, if one has been opened.


__Method__

```javascript
/**
 * @return {DeviceConnection}
 */
getConnection: function() {
```

__Parameters__

* None


__Returns__

* <code>{DeviceConnection}</code> - The connection open with this Device.


__Examples__


Device does not have a connection when it is instantiated
```javascript
var device = new Device();
device.getConnection();         // null
```

Device does not have a connection when it is first detected
```javascript
myDeviceManager.addEventListener(DeviceManager.EventTypes.DEVICE_DETECTED, function(event) {
    var device = event.getData().device;
    device.getConnection()      // null
});
```

Device has connection after connectToDevice is called
```javascript
myDeviceManager.addEventListener(DeviceManager.EventTypes.DEVICE_DETECTED, function(event) {
    var device = event.getData().device;
    device.connectToDevice();
    device.getConnection()      // {DeviceConnection}
});
```


<br /><a name="DeviceConnection" />
## DeviceConnection

Class used to represent a connection to a Drone device.


__Class__

```javascript
/**
 * @class
 * @extends {EventDispatcher}
 */
var DeviceConnection = Class.extend(EventDispatcher, {

    _name: "evolution.DeviceConnection",
```
[View code](https://github.com/brianneisler/evolution-drone/blob/v0.0.4/libraries/evolution-drone/js/src/core/DeviceConnection.js)


__Extends__

* [`EventDispatcher`](https://github.com/airbug/bugcore#EventDispatcher)


__Constructor Summary__

Access | Signature
--- | ---
constructor | <code>[DeviceConnection](#DeviceConnection_constructor)({[HID](https://github.com/node-hid/node-hid#complete-api)} hidConnection)</code>


__Getters and Setters Summary__

Access | Signature | Return Type
--- | --- | ---
public | <code>[getHidConnection](#DeviceConnection_getHidConnection)()</code> | <code>{[HID](https://github.com/node-hid/node-hid#complete-api)}</code>


__Method Summary__

Access | Signature | Return Type
--- | --- | ---
public | <code>[closeConnection](#DeviceConnection_closeConnection)()</code> | None
public | <code>[destroyConnection](#DeviceConnection_destroyConnection)()</code> | None

<br />
------------------------------------------------------------------------------------
<br />


<br /><a name="DeviceDataEvent" />
## DeviceDataEvent

Class used to represent a data event from the Drone device.


__Class__

```javascript
/**
 * @class
 * @extends {Event}
 */
var DeviceDataEvent = Class.extend(Event, /** @lends {DeviceDataEvent.prototype} */{

    _name: "evolution.DeviceDataEvent",
```
[View code](https://github.com/brianneisler/evolution-drone/blob/v0.0.4/libraries/evolution-drone/js/src/core/events/DeviceDataEvent.js)


__Extends__

* [`Event`](https://github.com/airbug/bugcore#Event)


__Constructor Summary__

Access | Signature
--- | ---
constructor | <code>[DeviceDataEvent](#DeviceDataEvent_constructor)({string} type, {*} data)</code>


__Getters and Setters Summary__

Access | Signature | Return Type
--- | --- | ---
public | <code>[getData](#DeviceDataEvent_getData)()</code> | <code>{{a: boolean, b: boolean, x: boolean, y: boolean, lb: boolean, rb: boolean, lt: boolean, rt: boolean, select: boolean, start: boolean, dup: boolean, dleft: boolean, dright: boolean, ddown: boolean, leftStick: { x: number, y: number, pressed: boolean }, rightStick: { x: number, y: number, pressed: boolean }}}</code>


__Method Summary__

Access | Signature | Return Type
--- | --- | ---
public | <code>[getLeftStick](#DeviceDataEvent_getLeftStick)()</code> | <code>{{ x: number, y: number, pressed: boolean }}</code>
public | <code>[getLeftStickX](#DeviceDataEvent_getLeftStickX)()</code> | <code>{number}</code>
public | <code>[getLeftStickY](#DeviceDataEvent_getLeftStickY)()</code> | <code>{number}</code>
public | <code>[getRightStick](#DeviceDataEvent_getRightStick)()</code> | <code>{{ x: number, y: number, pressed: boolean }}</code>
public | <code>[getRightStickX](#DeviceDataEvent_getRightStickX)()</code> | <code>{number}</code>
public | <code>[getRightStickY](#DeviceDataEvent_getRightStickY)()</code> | <code>{number}</code>
public | <code>[isAButtonPressed](#DeviceDataEvent_isAButtonPressed)()</code> | <code>{boolean}</code>
public | <code>[isBButtonPressed](#DeviceDataEvent_isBButtonPressed)()</code> | <code>{boolean}</code>
public | <code>[isDirectionDownPressed](#DeviceDataEvent_isDirectionDownPressed)()</code> | <code>{boolean}</code>
public | <code>[isDirectionLeftPressed](#DeviceDataEvent_isDirectionLeftPressed)()</code> | <code>{boolean}</code>
public | <code>[isDirectionRightPressed](#DeviceDataEvent_isDirectionRightPressed)()</code> | <code>{boolean}</code>
public | <code>[isDirectionUpPressed](#DeviceDataEvent_isDirectionUpPressed)()</code> | <code>{boolean}</code>
public | <code>[isLeftBumperPressed](#DeviceDataEvent_isLeftBumperPressed)()</code> | <code>{boolean}</code>
public | <code>[isLeftStickPressed](#DeviceDataEvent_isLeftStickPressed)()</code> | <code>{boolean}</code>
public | <code>[isLeftTriggerPressed](#DeviceDataEvent_isLeftTriggerPressed)()</code> | <code>{boolean}</code>
public | <code>[isRightBumperPressed](#DeviceDataEvent_isRightBumperPressed)()</code> | <code>{boolean}</code>
public | <code>[isRightStickPressed](#DeviceDataEvent_isRightStickPressed)()</code> | <code>{boolean}</code>
public | <code>[isRightTriggerPressed](#DeviceDataEvent_isRightTriggerPressed)()</code> | <code>{boolean}</code>
public | <code>[isSelectButtonPressed](#DeviceDataEvent_isSelectButtonPressed)()</code> | <code>{boolean}</code>
public | <code>[isStartButtonPressed](#DeviceDataEvent_isStartButtonPressed)()</code> | <code>{boolean}</code>
public | <code>[isXButtonPressed](#DeviceDataEvent_isXButtonPressed)()</code> | <code>{boolean}</code>
public | <code>[isYButtonPressed](#DeviceDataEvent_isYButtonPressed)()</code> | <code>{boolean}</code>


<br />
------------------------------------------------------------------------------------
<br />


<br /><a name="DeviceManager" />
## DeviceManager

TODO


<br /><a name="DeviceService" />
## DeviceService

TODO
