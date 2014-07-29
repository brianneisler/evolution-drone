/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugcore may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Script
//-------------------------------------------------------------------------------

var bugpack     = require("bugpack").loadContextSync(module);
bugpack.loadExportSync("drone.Drone");
var BugCore     = bugpack.require("BugCore");


//-------------------------------------------------------------------------------
// Exports
//-------------------------------------------------------------------------------

module.exports = BugCore.getInstance();
