/*
 * Copyright (c) 2014 Brian Neisler. http://brianneisler.com
 *
 * evolution-drone may be freely distributed under the MIT license.
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
