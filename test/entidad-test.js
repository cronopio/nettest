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
  }
}).export(module);