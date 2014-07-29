/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugcore may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Script
//-------------------------------------------------------------------------------

var bugpack     = require("bugpack").loadContextSync(module);
bugpack.loadExportSync("evolution.Drone");
var Drone       = bugpack.require("evolution.Drone");


//-------------------------------------------------------------------------------
// Exports
//-------------------------------------------------------------------------------

module.exports = Drone.getInstance();
