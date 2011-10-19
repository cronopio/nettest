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
  App.emit('init');
});

App.on('database::conectado', function() {
  App.emit('boot');
});

App.on('plugins::children::ready', function() {
  App.emit('init');
});

App.start();
