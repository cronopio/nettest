/**
 * Pruebas para el instanciamiento de una Entidad.
 * @author: Daniel Aristizabal Romero
 * @date: 18 octubre 2011
 */

var vows = require('vows'),
    assert = require('assert'),
    Entidad = require('../lib/entidad');
    
vows.describe('Inicializando Entidad').addBatch({
  'Una Entidad': {
    topic: new Entidad(),
    'tipo objeto': function(entity) {
      assert.equal(entity.type, 'object');
    },
    'subtipo vacio': function(entity) {
      assert.isNull(entity.subtype);
    },
    'entidad habilitada': function(entity) {
      assert.isTrue(entity.enabled);
    },
    'Otros atributos inicializados': function(entity) {
      assert.isDefined(entity.guid);
      assert.isDefined(entity.site_guid);
      assert.isDefined(entity.time_created);
      assert.isDefined(entity.time_updated);
      assert.isDefined(entity.last_action);
    }
  }
}).export(module);