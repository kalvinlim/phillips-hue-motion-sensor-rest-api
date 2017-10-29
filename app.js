var express = require('express');
var app = express();

var SensorController = require('./SensorController');
app.use('/sensor', SensorController);

module.exports = app;