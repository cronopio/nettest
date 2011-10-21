/**
 * Definicion de la Entidad Sitio.
 * @author: Daniel Aristizabal Romero
 * @date: 20 octubre 2011
 */

var mongoose = require('mongoose'),
    Entidad = require('./entidad');

Entidad.tipo = { type: String, default: 'site' };
Entidad.name = String;
Entidad.description = String;
Entidad.url = String;

mongoose.model('Sitio', new mongoose.Schema(Entidad));

module.exports = Entidad;
