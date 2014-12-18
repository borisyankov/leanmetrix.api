var config = require('../config.json');

global.Promise = global.Promise || require('bluebird');
Error.stackTraceLimit = Infinity;
module.exports = function(app) {
  app.name = config.name;

  return config;
};
