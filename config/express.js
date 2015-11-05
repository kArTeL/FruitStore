/**
 * Express configuration
 */

'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var config = require('./environment');

module.exports = function(app) {
  var env = app.get('env');

  // app.set('views', config.root + '/public');
  // app.set('view engine', 'html');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  if ('production' === env) {
    app.use(express.static('public'));
    //app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    //app.use(express.static(path.join(config.root, 'public')));
    //app.set('appPath', config.root + '/public');
    //app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(express.static('public'));
    // app.use(express.static(path.join(config.root, '.tmp')));
    // app.use(express.static(path.join(config.root, 'public')));
    // app.set('appPath', 'public');
  }
};
