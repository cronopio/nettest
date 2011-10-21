/**
 * Definicion de la entidad base del sistema.
 * @author: Daniel Aristizabal Romero
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var Entidad = module.exports = function(inicializadores) {
  var _attrs = {
    tipo: { type: String, default: 'object' },
    subtipo: String,
    enabled: Boolean,
    site_guid: ObjectId,
    time_created: { type: Date, default: Date.now },
    time_updated: { type: Date, default: Date.now },
    last_action: String
  };
  var _schema = new Schema(_attrs);
  
  return function(otros) {
    console.log('Inicializando'); 
    return { model: new _schema }
  };
};