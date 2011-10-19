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
    var db = mongoose.createConnection(this['db-uri']);
    db.on('open', function() {
      self.emit('conectado');
    });
  });
};

util.inherits(Database, Hook);