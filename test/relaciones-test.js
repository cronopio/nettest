/**
 * Pruebas para el uso de relaciones entre entidades
 * @author: Daniel Aristizabal Romero
 * @date: 20 octubre 2011
 */

var vows = require('vows'),
    assert = require('assert'),
    mongoose = require('mongoose'),
    ev = require('events').EventEmitter,
    Sitio = require('../lib/sitio'),
    Entidad = require('../lib/entidad'),
    Relaciones = require('../lib/relaciones');

mongoose.connect("mongodb://localhost/nettest-test");

vows.describe('Probando las relaciones').addBatch({
  'Creamos un sitio': {
    topic: function() {
      var mySite = new mongoose.models.Sitio;
      mySite.name = 'Tener un Miembro';
      mySite.save(this.callback);
    },
    'Creado con el nombre correcto': function(err, doc) {
      assert.isNull(err);
      assert.equal(doc.name, 'Tener un Miembro')
    }
  },
  'Creamos la entidad': {
    topic: function() {
      var myEnt = new mongoose.models.Entidad;
      myEnt.last_action = 'Creada';
      myEnt.save(this.callback);
    },
    'Crada correctamente': function(err, doc) {
      assert.isNull(err);
      assert.equal(doc.last_action, 'Creada');
    }
  }
}).addBatch({
'Buscamos el sitio y la entidad': {
  topic: function() {
    var respuesta = new ev();
    mongoose.models.Sitio.findOne({name:'Tener un Miembro'}, function(er, sitio) {
      mongoose.models.Entidad.findOne({last_action:'Creada'}, function(err, entidad) {
        respuesta.emit('success', {s: sitio, e: entidad});
      });
    });
    return respuesta;
  },
  'sitio correcto': function(data) {
    assert.equal(data.s.name, 'Tener un Miembro');
  },
  'entidad correcta': function(data) {
    assert.equal(data.e.last_action, 'Creada');
  },
  'y ahora relacionamos': {
    topic: function(data) {
      var rel = new mongoose.models.Relacion;
      rel.left = data.s._id;
      rel.rigth = data.e._id;
      rel.relation = 'member_of';
      rel.save(this.callback);
    },
    'Guardado correcto': function(err, doc) {
      assert.isNull(err);
      assert.equal(doc.relation, 'member_of');
    }
  }
}
}).export(module);
