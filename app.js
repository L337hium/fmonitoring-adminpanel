/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , bootstrap = require('bootstrap3-stylus')
  , mongoose = require ('mongoose')
  , exec = require ('exec')

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
app.get('/collect', function (req, res) {
  exec('ssh -nqt root@10.63.43.1 "sh /usr/share/fmonitoring/get_monitoring.sh"',
    function(error, stdout, stderr) {
      var collection = JSON.parse(stdout);
      res.render('index',
        { title: 'Collection data'
        , collection: collection
	}
      );
   });
})
app.listen(3000)
console.log( 'express webserver running on http://localhost:3000');
