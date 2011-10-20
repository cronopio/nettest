/**
 * @author Daniel Aristizabal Romero
 */

var Hook = require('hook.io').Hook,
    util = require('util'),
    mongoose = require('mongoose');

var Database = exports.database = function (options) {
  var self = this;
  Hook.call(this, options);
  
  this.on('hook::ready', function () {
    mongoose.connect(this['db-uri']);
    mongoose.connection.on('open', function() {
      self.emit('conectado');
    });
  });
};

util.inherits(Database, Hook);