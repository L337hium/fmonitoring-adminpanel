/* 
 *  Zuckerrausch - node-webdev-base                                 ∩∩
 *                                                                （ﾟωﾟ）
 *  App starting point, launch via 'node app' or 'nodemon app'   　 │ │
 *                                                               　 │ └──┐○
 *  The app provides a base for launching node-web-development　    ヽ　　丿
 * 　                                                              　 ∥￣∥
 */

/* 
 *  Module dependencies
 */
 
var express = require('express')
  , mongoose = require ('mongoose')
require('express-mongoose')

// load database models into mongoose
var models = require('./models');

// connect to database 
var databaseName = 'webdev-base';
mongoose.connect('mongodb://localhost/'+databaseName, function (err) {

  // load express
  var app = express()

  // load session / user management middleware
  require('./middleware')(app);

  // activate dev output of express
  app.use(express.logger('dev'))

  // setup some variables for the render engine
  app.jadeConfig = 
    { project : 'node-webdev-base'
    }
  // express routing and render engine setup
  require('./routes')(app);

  app.listen(3000)
  console.log( 'express webserver running on http://localhost:3000');

});
