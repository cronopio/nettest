/**
 * Definicion de las funciones necesarias para las relaciones.
 * @author: Daniel Aristizabal Romero
 * @date: 20 octubre 2011
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var Relaciones = module.exports = new Schema({
  left: ObjectId,
  relation: String,
  rigth: ObjectId,
  time_created: { type: Date, default: Date.now }
});

mongoose.model('Relacion', Relaciones);