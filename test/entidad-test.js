/**
 * Pruebas para el instanciamiento de una Entidad.
 * @author: Daniel Aristizabal Romero
 * @date: 18 octubre 2011
 */

var vows = require('vows'),
assert = require('assert'),
mongoose = require('mongoose'),
Entidad = require('../lib/entidad');

vows.describe('Probando la Entidad').addBatch({
  'Instancio la entidad': {
    topic: new mongoose.models.Entidad,
    'El tipo debe ser objeto': function(entity) {
      assert.equal(entity.tipo, 'object')
    },
    'El subtipo debe estar indefinido': function(entity) {
      assert.isUndefined(entity.subtipo);
    },
    'Debe tener fecha de creacion y actualizacion': function(entity) {
      assert.instanceOf(entity.time_created, Date);
      assert.instanceOf(entity.time_updated, Date);
    },
    'La fecha de actualizacion debe ser mayor a la de creacion': function(entity) {
      assert.strictEqual(entity.time_updated.valueOf() > entity.time_created.valueOf(), true);
    },
    'La fecha de actualizacion no debe estar un minuto despues de la de creacion': function(entity) {
      var diff = entity.time_updated.valueOf() - entity.time_created.valueOf();
      assert.strictEqual(diff < 60, true);
    }
  },
  'Creando un subtipo de la Entidad': {
    topic: new mongoose.models.Entidad({subtipo:'user'}),
    'probamos que sea una entidad objeto': function(e) {
      assert.equal(e.tipo, 'object');
    },
    'probamos que sea de subtipo user': function(e) {
      assert.equal(e.subtipo, 'user');
    }
  },
  'Extendiendo una entidad usuario': {
    topic: function() {
      mongoose.modelSchemas.Entidad.add({completo: {type: String, get: function(v) {
        console.log('Contexto', this);
        console.log('Llegada', v);
        return this.nombre + ' ' + this.apellido;
      }}});
      var usuario = new mongoose.models.Entidad({subtipo:'user'});
      usuario.nombre = 'Pedro'
      usuario.apellido = 'Perez'
      return usuario;
    },
    'Debe llamarse pedro': function(e) {
      assert.equal(e.nombre, 'Pedro')
    },
    'Debe tener Perez como apellido': function(e) {
      assert.equal(e.apellido, 'Perez')
    },
    'Debe mostrar el nombre copleto': function(e) {
      assert.equal(e.completo, 'Pedro Perez');
    }
  }
}).export(module);