/**
 * Definicion de la Entidad Sitio.
 * @author: Daniel Aristizabal Romero
 * @date: 20 octubre 2011
 */

var mongoose = require('mongoose'),
    Entidad = require('./entidad');

Entidad.add({
  tipo: {type: String, default: 'site'},
  name: String,
  description: String,
  url: String
});

mongoose.model('Sitio', Entidad);

module.exports = Entidad;
