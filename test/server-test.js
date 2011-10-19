/**
 * Pruebas para el instanciamiento de una Entidad.
 * @author: Daniel Aristizabal Romero
 * @date: 19 octubre 2011
 */

var vows = require('vows'),
    assert = require('assert'),
    Hook = require('hook.io').Hook,
    mongoose = require('mongoose'),
    Server;
    
vows.describe('Inicializando la Aplicacion').addBatch({
  'Arranco el Hook principal y el core': {
    topic: function() {
      Server = require('../server');
      Server.on('boot', this.callback);
    },
    'es un Hook valido': function() {
      assert.equal(Server.type, 'hook');
    },
    'Debe estar escuchando': function() {
      assert.isTrue(Server.listening);
    },
    'No debe estar conectado': function() {
      assert.isFalse(Server.connected);
    }
  },
  'Core arrancado': {
    topic: function() {
      Server.on('plugins_boot', this.callback);
    },
    'Conexion a la BD': function() {
      assert.isObject(mongoose.connections[0]);
    },
    'Lib Database cargada': function() {
      assert.isObject(Server.children.database);
      assert.isTrue(Server.children.database._hook.connected);
      assert.isFalse(Server.children.database._hook.listening);
    },
    'Lib Plugins cargada': function() {
      assert.isObject(Server.children.plugins);
      assert.isTrue(Server.children.plugins._hook.connected);
      assert.isFalse(Server.children.plugins._hook.listening)
    }
  },
  'Inicializacion de los plugins': {
    topic: function() {
      Server.on('plugins::init', this.callback);
    },
    'Cargo el, plugin test': function() {
      assert.isObject(Server.children.plugins._hook.children.test);
    },
    'Cargo el plugin test2': function() {
      assert.isObject(Server.children.plugins._hook.children.test2);
    }
  },
  'Termina de arrancar el framework base': {
    topic: function() {
      Server.on('ready', this.callback);
    },
    'Completo': function() {}
  }
}).export(module);