/**
 * Definicion de la entidad base del sistema.
 * @author: Daniel Aristizabal Romero
 */

var Entidad = module.exports = function (options) {
  var self = this,
  options = options || {};
  
  // Inicializo atributos.
  this.type         = options.type || 'object';
  this.subtype      = options.subtype || null;
  this.guid         = 0;
  this.enabled      = true;
  this.site_guid    = null;
  this.time_created = null;
  this.time_updated = null;
  this.last_action  = null;
  
  
};