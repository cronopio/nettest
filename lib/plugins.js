/**
 * @author Daniel Aristizabal Romero
 */

var Hook = require('hook.io').Hook,
    util = require('util'), 
    fs   = require('fs');

var Plugins = exports.database = function (options) {
  var self = this;
  Hook.call(this, options);
  
  self.on('hook::ready', function () {
    self.on('*::plugins_boot', function() {
      self.listen();
      var path = process.cwd() + '/plugins/',
          plugins = [];
      fs.readdir(path, function(err, list) {
        var cant = list.length;
        for (var l in list) {
          plugins.push({src:'./plugins/' + list[l], name:list[l]});
        }
        self.on('children::ready', function() {
          var pluginsCargados = 0;
          self.on('*::plugins::init', function() {
            pluginsCargados++;
            if (cant == pluginsCargados){
              self.emit('ready');
            }
          });
          self.emit('init');
        });
        self.spawn(plugins);
      });
    });
  });
};

util.inherits(Plugins, Hook);