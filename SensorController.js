const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const _ = require('lodash');
const moment = require('moment');
const app = express();
const Promise = require("bluebird");
const rp = Promise.promisifyAll(require("request-promise"));
const request = require("request");
const config = require('./config');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function (req, res) {
    let hue = new HueMotionSensor(config.url);
    hue.getAll(res);
});

class HueMotionSensor {
    constructor(url) {
        this.url = url;
    }
    
    getAll(res){
        var options = {
            uri: this.url,
            json: true // Automatically parses the JSON string in the response
        };
        var self = this;
        rp(options)

        .then(function (body) {    
            res.status(200).send(_.merge(self.getLastMotionDetected(body), self.getTemperatureInFahrenheit(body)));
        })
        .catch(function (err) {
            // API call failed...
            console.log(err);
        });

    }

    getTemperatureInFahrenheit(json){
        var tempInFaren = json[_.findKey(json, function(o) { return o.name == 'Hue temperature sensor 1'; })].state.temperature;

        var temperature = {};
        temperature.temperature = {};
        
        var tempValue = tempInFaren*0.018+32;
        var tempUnit = "Farenheit;" 

        temperature.temperature.value = tempValue;
        temperature.temperature.symbol = "°F";
        temperature.temperature.unit = tempUnit;
        temperature.temperature.spoken = "The current temperature is " + Math.round(tempValue) + " degrees " + tempUnit; 
        return temperature;
    }

    getLastMotionDetected(json){
        var result = _.findKey(json, function(o) { return o.name == 'Hue motion sensor'; });
        var foo = moment.utc(json[result].state.lastupdated).local().format('MM-DD hh:mm:ss a');
        moment().local();
        var timestamp = {};

        timestamp.movement = {};
        timestamp.movement.value = foo;        
        return timestamp;
    }
}

module.exports = router;