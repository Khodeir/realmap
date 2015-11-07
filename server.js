'use strict';

// Module dependencies
var express = require('express'),
    http = require('http'),
    path = require('path');

// Create server
var app = express();

app.get('/', function(req, res) {
  res.send('hello!');
});

// Export module
module.exports = app;