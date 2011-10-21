/**
 * Definicion de la entidad base del sistema.
 * @author: Daniel Aristizabal Romero
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var _attrs = {
  tipo: { type: String, default: 'object' },
  subtipo: String,
  enabled: Boolean,
  site_guid: ObjectId,
  time_created: { type: Date, default: Date.now },
  time_updated: { type: Date, default: Date.now },
  last_action: String
};
    
function Entidad(inicializadores) {
  var self = this;
  for (var a in _attrs) {
    if (typeof _attrs[a] === 'object') {
      for (var aa in _attrs[a]) {
        if (aa === 'default') {
          if (typeof _attrs[a].default === 'function') {
            self[a] = _attrs[a].default();
          } else {
            self[a] = _attrs[a].default;
          }
        }
      }
    }
  }
};

Entidad.prototype.set = function(vals) {
  if (typeof vals !== 'object') {
    throw new Error('Debe ser un objeto');
  }
};

module.exports = Entidad; 