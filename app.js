const express = require('express');
const app = express();

const SensorController = require('./controllers/SensorController');
const CommandCenterController = require('./controllers/CommandCenterController');
const LivingRoomController = require('./controllers/LivingRoomController');
const StatusController = require('./controllers/StatusController');
const FrontLightController = require('./controllers/FrontLightController');

//const DashboardController = require('./controllers/DashboardController');

const path    = require("path");
const config = require(path.normalize(__dirname + "/config.js"));

app.use(express.static('public'))

app.all('*', function (req, res, next){
	if(config.apiKey == req.query.apiKey){
		next();
	} else {
		res.status(401).send();
	}
})


app.use('/status', StatusController);
app.use('/sensor', SensorController);
app.use('/commandcenter', CommandCenterController);
app.use('/livingroom', LivingRoomController);
app.use('/frontlight', FrontLightController);

//app.use('/dashboard', DashboardController);


module.exports = app;