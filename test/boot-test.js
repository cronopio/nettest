/**
 * Pruebas para el arranque del sistema base
 * @author: Daniel Aristizabal Romero
 * @date: 18 octubre 2011
 */

var vows = require('vows'),
    assert = require('assert'),
    Hook = require('hook.io').Hook;
    
vows.describe('Inicializando Applicacion').addBatch({
  'Hook Base': {
    topic: function() {
      var hook = new Hook({name:'test-app', debug:true});
      hook.once('hook::ready', this.callback.bind(hook, null));
      hook.start();
    },
    'inicio el hook base': function() {
      assert.equal(this.event, 'hook::ready');
    },
    'cargo la libreria de los plugins': {
      topic: require('../lib/plugins'),
      'revisamos que plugins existen': function(lib) {
        
      }
    }
  }
}).export(module);