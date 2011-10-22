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
    topic: function() {
      return Entidad;
    },
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
    'Debe tener tipo object': function(e) {
      assert.equal(e.tipo, 'object');
    },
    'Las fechas deben ser numeros': function(e) {
      assert.isNumber(e.time_created);
      assert.isNumber(e.time_updated);
    },
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
    },
    'la funcion no puede recibir un string': function(e) {
      var self = e;
      assert.throws(function() {
        self.set('testing');
      }, Error);
    },
    'la funcion set no puede recibir una funcion': function(e) {
      var self = e;
      assert.throws(function() {
        self.set(function(){});
      }, Error);
    }
  }
}).addBatch({
  'Comprobamos Set() a fondo': {
    topic: new Entidad(),
    'Set debe ser una funcion': function(e) {
      assert.isFunction(e.set);
    },
    'Recibe un atributo permitido': function(e) {
      assert.isObject(e.set({subtipo:'otrotipo'}));
    },
    'Niega un atributo no permitido': function(e) {
      assert.isFalse(e.set({noesunatributo:'otrotipo'}))
    },
    'Uso varios atributos': function(e) {
      var res = e.set({subtipo:'nuevotipo', tipo:'test'})
      assert.isObject(res);
      assert.equal(res.subtipo, 'nuevotipo');
      assert.equal(res.tipo, 'test');
    },
    'Uso varios atributos invalidos': function(e) {
      assert.isFalse(e.set({nopermitdo:'nuevotipo', nodefinido:'test'}));
    },
    'Uso mezcla de atributos': function(e) {
      assert.isFalse(e.set({subtipo:'nuevotipo', nodefinido:'test'}))
    }
  }
}).addBatch({
  'Comprobamos Get() a fondo': {
    topic: new Entidad(),
    'Get debe ser una funcion': function(e) {
      assert.isFunction(e.get);
    },
    'Get debe recibir un string': function(e) {
      assert.notEqual(e.get('tipo'), false);
    },
    'No debe recibir un array': function(e) {
      assert.isFalse(e.get(['tipo', 'subtipo']));
    },
    'No debe recibir un objeto': function(e) {
      assert.isFalse(e.get({tipo:true, subtipo:false}));
    }
  }
}).addBatch({
  'Instancio una entidad': {
    topic: new Entidad(),
    'para verificar set con el subtipo':{
      topic: function(e) {
        assert.isObject(e.set({subtipo:'deprueba'}));
        return e;
      },
      'Usamos get para verificar el subtipo': function(E, e) {
        assert.isNull(E);
        assert.equal(e.get('subtipo'), 'deprueba');
      }
    }
  }
}).export(module);
