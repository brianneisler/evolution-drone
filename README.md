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

Latest Version `0.0.2`

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
```
[View code](https://github.com/brianneisler/evolution-drone/blob/v0.0.2/libraries/evolution-drone/js/src/core/Device.js)


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
### Class(hidDevice)

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


<br /><a name="DeviceConnection" />
## DeviceConnection

TODO


<br /><a name="DeviceDataEvent" />
## DeviceDataEvent

TODO


<br /><a name="DeviceManager" />
## DeviceManager

TODO


<br /><a name="DeviceService" />
## DeviceService

TODO
