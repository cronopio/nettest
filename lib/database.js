/**
 * @author Daniel Aristizabal Romero
 */

var mongoose = require('mongoose');

module.exports = function(App) {
  App.db = mongoose.createConnection(App['db-uri']);
};
