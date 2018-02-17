const express = require('express');
const app = express();

const SensorController = require('./controllers/SensorController');
const CommandCenterController = require('./controllers/CommandCenterController');
//const DashboardController = require('./controllers/DashboardController');

app.use(express.static('public'))

app.use('/sensor', SensorController);
app.use('/commandcenter', CommandCenterController);
//app.use('/dashboard', DashboardController);


module.exports = app;