/* 
 *  Module dependencies
 */
 
var express = require('express')
  , mongoose = require ('mongoose')
  , exec = require ('exec')
 
require('express-mongoose')

// load database models into mongoose
var models = require('./models');

// connect to database 
var databaseName = 'fmonitoring';
mongoose.connect('mongodb://localhost/'+databaseName, function (err) {

  // load express
  var app = express()

  // load session / user management middleware
  require('./middleware')(app);

  // activate dev output of express
  app.use(express.logger('dev'))

  // setup some global variables for the render engine
  app.jadeConfig = 
    { project : 'fmonitoring-adminpanel'
    }
  // express routing and render engine setup
  require('./routes')(app);

  app.listen(3000)
  console.log( 'express webserver running on http://localhost:3000');
});
