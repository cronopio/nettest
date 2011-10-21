/**
 * Pruebas para el instanciamiento de una Entidad.
 * @author: Daniel Aristizabal Romero
 * @date: 21 octubre 2011
 */

var vows = require('vows'),
    assert = require('assert'),
    mongoose = require('mongoose'),
    Entidad = require('../class/entidad');

mongoose.connect("mongodb://localhost/nettest-test");

vows.describe('Probando la Entidad').addBatch({
  'Tratamos de cargar el codigo': {
    topic: Entidad,
    'Debe tener un constructor': function(E) {
      assert.isFunction(E);
    },
    'El constructor retorna un objeto': function(E){
      var test = new E();
      assert.isObject(test);
    }
  }
}).addBatch({
  'Instancio la Entidad': {
    topic: new Entidad(),
    'Debe tener una funcion set': function(e) {
      assert.isFunction(e.set);
    },
    'Debe tener una funcion get': function(e) {
      assert.isFunction(e.get);
    },
    'La funcion set puede recibir un objeto JSON': function(e) {
      var self = e;
      assert.doesNotThrow(function(){
        self.set({subtipo:'alguno'});
      }, Error);
    }
  }
}).export(module);
