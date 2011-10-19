/**
 * @author Daniel Aristizabal Romero
 */

var Hook = require('hook.io').Hook,
    util = require('util');

var Test = exports.database = function (options) {
  var self = this;
  Hook.call(this, options);
  
  this.on('*::init', function() {
    console.log('Inicializacion del plugin');
  });
};

util.inherits(Test, Hook);