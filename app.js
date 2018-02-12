const express = require('express');
const app = express();

const SensorController = require('./controllers/SensorController');
//const DashboardController = require('./controllers/DashboardController');

app.use(express.static('public'))

app.use('/sensor', SensorController);
//app.use('/dashboard', DashboardController);


module.exports = app;