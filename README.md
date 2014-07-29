# evolution-drone

evolution-drone is a node JS library for interfacing with
[Evolution Controller's Drone gamepad](http://www.evolutioncontrollers.com/).

This library provides a basic DeviceManager that continuously scans for Drone devices.
Once a device is detected, an event will be dispatched that contains the new Device
instance. You can then use this instance to connect to the Drone controller.

After you connect to a Device, that instance will then emit DeviceEvents that contain
details of how the controller is being used.

This library is a work in progress and a side hobby of mine. If you have interest in
contributing or specific requests, please feel free to open up an issue on github and
I will get back to you.

Latest Version `0.0.1`

NOTE: This documentation is still being written. If you click on a link and it
doesn't go anywhere, it's likely because that portion of the docs hasn't been
written yet. If there are parts of the docs you'd like us to focus on, feel
free to ask!


## Quick Examples

Using DeviceManager
```javascript
var evolution  = require('evolution-drone')'

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


## Dependencies

evolution-drone is dependent upon the following libraries
[bugcore](https://github.com/airbug/bugcore)
[bugpack](https://github.com/airbug/bugpack)
[node-hid](https://github.com/node-hid/node-hid)


## Download Source

The source is available for download from [GitHub](https://github.com/bneisler/evolution-drone)


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
* [`DeviceManager`](#DeviceManager)
* [`DeviceService`](#DeviceService)
