const express = require('express');
const app = express();

const SensorController = require('./controllers/SensorController');
const CommandCenterController = require('./controllers/CommandCenterController');
const LivingRoomController = require('./controllers/LivingRoomController');
const StatusController = require('./controllers/StatusController');
const FrontLightController = require('./controllers/FrontLightController');

//const DashboardController = require('./controllers/DashboardController');

app.use(express.static('public'))

app.use('/status', StatusController);
app.use('/sensor', SensorController);
app.use('/commandcenter', CommandCenterController);
app.use('/livingroom', LivingRoomController);
app.use('/frontlight', FrontLightController);

//app.use('/dashboard', DashboardController);


module.exports = app;