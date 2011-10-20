/**
 * Pruebas para el instanciamiento de un sitio.
 * @author: Daniel Aristizabal Romero
 * @date: 20 octubre 2011
 */

var vows = require('vows'),
    assert = require('assert'),
    mongoose = require('mongoose'),
    Sitio = require('../lib/sitio');

mongoose.connect("mongodb://localhost/nettest-test");

vows.describe('Probando el Sitio').addBatch({
  'Al iniciar chequeamos la Entidad': {
    topic: new mongoose.models.Sitio,
    'Debe tener tiempos de creacion y de actualizacion': function(e) {
      assert.instanceOf(e.time_created, Date);
      assert.instanceOf(e.time_updated, Date);
    },
    'Debe ser de tipo Sitio': function(e) {
      assert.equal(e.tipo, 'site')
    },
    'con datos del sitio': {
      topic: function(e) {
        e.name = 'TestSite';
        e.description = 'Esta es la descripcion';
        e.url = 'http://elmismo.com';
        e.save(this.callback);
      },
      'Debe Tener el nombre TestSite': function(err, doc) {
        assert.equal(doc.name, 'TestSite');
      },
      'Debe tener la descripcion correcta': function(err, doc) {
        assert.equal(doc.description, 'Esta es la descripcion');
      },
      'Debe tener URL': function(err, doc) {
        assert.equal(doc.url, 'http://elmismo.com');
      }
    }
  },
  'Buscamos el TestSite': {
    topic: function() {
      var sitio = mongoose.models.Sitio;
      sitio.find({name:'TestSite'}, this.callback);
    },
    'Debe regresar un array con minimo un elemento': function(err, docs) {
      assert.isArray(docs);
      assert.isTrue(docs.length > 0);
    },
    'usando el primer resultado': {
      topic: function(docs) {
        return docs[0];
      },
      'Debe tener el nombre y la descripcion': function(site) {
        assert.equal(site.name, 'TestSite');
        assert.equal(site.description, 'Esta es la descripcion');
      },
      'Debe tener la URL': function(site) {
        assert.equal(site.url, 'http://elmismo.com');
      }
    }
  },
  'TestSite con info que no esta en el schema': {
    topic: function() {
      var sitioPrueba = new mongoose.models.Sitio;
      sitioPrueba.name = 'OtroTestSite';
      sitioPrueba.description = 'Esta es la descripcion del otro sitio de prueba';
      sitioPrueba.url = 'http://elmismositiodeprueba.com';
      sitioPrueba.sinEsquema = 'Esta info no debe guardarse';
      sitioPrueba.save(this.callback);
    },
    'haciendo consulta': {
      topic: function() {
        var modelo = mongoose.models.Sitio;
        modelo.find({name:'OtroTestSite'}, this.callback);
      },
      'Debe regresar un array minimo de un elemento': function(err, docs) {
        assert.isArray(docs);
        assert.isTrue(docs.length > 0);
      },
      'usando el primer resultado': {
        topic: function(docs) {
          return docs[0];
        },
        'Debe tener el nombre y la descripcion': function(s) {
          assert.equal(s.name, 'OtroTestSite');
          assert.equal(s.description, 'Esta es la descripcion del otro sitio de prueba');
        },
        'Debe tener la URL': function(s) {
          assert.equal(s.url, 'http://elmismositiodeprueba.com')
        },
        'No debe contener info que no esta en el esquema': function(s) {
          assert.isUndefined(s.sinEsquema);
        }
      }
    }
  }
}).export(module);