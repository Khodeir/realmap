'use strict';

// Module dependencies
var express = require('express'),
    http = require('http'),
    path = require('path'),
    fs = require('fs');

// Create server
var app = express();

app.get('/api/places', function(req, res) {
	fs.readFile('places.json', 'utf8', function (err, data) {
	  res.send(data);
	});
});

// Export module
module.exports = app;