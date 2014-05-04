var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , bootstrap = require('bootstrap3-stylus')
  , exec = require('exec')

module.exports = function (app) {
  // ------------------------------------------------------------
  // RENDER ENGINE SETUP
  
  // ------------------------------------------------
  // stylus 
  // 
  // after finishing the stylus stuff you can simply remove it and work with the compiled css files

  
  // compile function for our stylus css templates
  function compile(str, path) {
    return stylus(str)
      .set('filename', path)
      .use(nib())
      .use(bootstrap())
  }
  // routing for the stylus css templates
  app.use(stylus.middleware(
    { src: __dirname + '/../assets'
    , compile: compile
    }
  ))
  
  //-------------------------------------------------
  // jade
  
  // location of our jade basefolder
  app.set('views', __dirname + '/../views')
  
  // set jade as view engine
  app.set('view engine', 'jade')
  
  
  // ------------------------------------------------------------
  // ACTUAL ROUTING
  
  // routing to the static '/assets' folder and subfolders
  app.use(express.static(__dirname + '/../assets'))
  
  // routing for get request of the homepage '/'
  app.get('/', function (req, res) {
    var config = app.jadeConfig;
        config.title = 'fmonitoring-adminpanel: Home';
    res.render('index', config)
  })

  // collect
  app.get('/collect', function (req, res) {
    exec('ssh -nqt root@10.63.43.1 "sh /usr/share/fmonitoring/get_monitoring.sh"',
      function(error, stdout, stderr) {
	var config = app.jadeConfig;
            config.title = 'fmonitoring-adminpanel: Collection data';
            config.collection = JSON.parse(stdout);
            config.collection.date = Date(config.collection.date * 1000);
        console.log(config.collection.network.interfaces);
        res.render('index', config)
       }
    );
  })
}
