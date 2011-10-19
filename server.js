/**
 * @author Daniel Aristizabal Romero
 */

var Hook = require('hook.io').Hook;

var App = new Hook({
  name: "app",
  debug: true
});

var libs = ['database', 'plugins'],
    libHooks = [];

for (var l in libs) {
  libHooks.push({src:'./lib/' + libs[l], name:libs[l]});
}

App.on('hook::ready', function() {
  App.spawn(libHooks);
  App.emit('boot');
});

App.on('database::conectado', function() {
  App.emit('plugins_boot');
});

App.on('plugins::ready', function() {
  App.emit('ready');
});

App.start();
