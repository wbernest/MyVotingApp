'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://service:1234@ds163918.mlab.com:63918/wbernest-voter-db'
  },

  // Seed database on startup
  seedDB: true

};
