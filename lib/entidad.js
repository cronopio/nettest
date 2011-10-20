/**
 * Definicion de la entidad base del sistema.
 * @author: Daniel Aristizabal Romero
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Entidad = new Schema({
  tipo: { type: String, default: 'object' },
  subtipo: String,
  enabled: Boolean,
  site_guid: ObjectId,
  time_created: { type: Date, default: Date.now },
  time_updated: { type: Date, default: Date.now },
  last_action: String
});

mongoose.model('Entidad', Entidad);
