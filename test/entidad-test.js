/**
 * Pruebas para el instanciamiento de una Entidad.
 * @author: Daniel Aristizabal Romero
 * @date: 18 octubre 2011
 */

var vows = require('vows'),
assert = require('assert'),
mongoose = require('mongoose'),
Entidad = require('../lib/entidad');

mongoose.connect("mongodb://localhost/nettest-test");

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
      Entidad.add({completo: {type: String, get: function() {
        return this.nombre + ' ' + this.apellido;
      }}});
      mongoose.model('EntidadExt', Entidad);
      var usuario = new mongoose.models.EntidadExt({subtipo:'user'});
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
  },
  'Instancio la Entidad para probar la guardada': {
    topic: function() {
      var guardar = new mongoose.models.Entidad;
      guardar.last_action = "creada";
      guardar.save(this.callback);
    },
    'Que sea un objeto': function(e, doc) {
      assert.equal(doc.tipo, 'object')
    },
    'Que tenga fecha de creacion': function(e, doc) {
      assert.instanceOf(doc.time_created, Date);
    },
    'Que tenga como last_action creada': function(e, doc) {
      assert.equal(doc.last_action, 'creada');
    }
  },
  'Inicio una busqueda en la BD': {
      topic: function() {
        var creada = mongoose.models.Entidad;
        creada.find({last_action:"creada"}, this.callback);
      },
      'Recibo un Array de mongoose': function(e, docs) {
        assert.isArray(docs);
      },
      'Recibo minimo un resultado': function(e, docs) {
        assert.strictEqual(docs.length > 0, true)
      },
      'El primer resultado debe ser crada': function(e, docs) {
        assert.equal(docs[0].last_action, 'creada');
      }
    }
}).export(module);