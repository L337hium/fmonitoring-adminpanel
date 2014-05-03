/*
 * Module dependencies
 */
var express = require('express')
  , mongoose = require ('mongoose')

require('express-mongoose')

// load express
var app = express()

// activate dev output of express
app.use(express.logger('dev'))

// express routing and render engine setup
require('./routes')(app);

app.listen(3000)
console.log( 'express webserver running on http://localhost:3000');
