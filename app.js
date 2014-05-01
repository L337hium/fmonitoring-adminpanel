/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , bootstrap = require('bootstrap3-stylus')
  , mongoose = require ('mongoose')

require('express-mongoose')

// load express
var app = express()
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
    .use(bootstrap())
}

// middleware
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/assets'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/assets'))

// basic routing

app.get('/', function (req, res) {
  res.render('index',
    { title : 'Home' }
  )
})

app.listen(3000)
console.log( 'express webserver running on http://localhost:3000');
