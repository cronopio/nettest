/**
 * @author Daniel Aristizabal Romero
 */

var Hook = require('hook.io').Hook;

var App = new Hook({
  name: "app",
  debug: true
});

var libs = ['database'],
    code = {};


for (var l in libs) {
  code[libs[l]] = require('./lib/' + libs[l]);
  // Cargo cada libreria
  code[libs[l]](App);
}

App.start();
