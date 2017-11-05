'use strict';

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

router.get('/', (req, res) => {
    const hue = new HueMotionSensor(config.url);
    hue.getAll(res)
        .then(body => res.status(200).send(_.merge(hue.getLastMotionDetected(body), hue.getTemperatureInFahrenheit(body))))
        .catch(err => console.log(err));
});

class HueMotionSensor {
    constructor(url) {
        this.url = url;
    }
    
    getAll(res){
        const options = {
            uri: this.url,
            json: true 
        };

        return rp(options)
    }

    getTemperatureInFahrenheit(json){
        let tempInFaren = json[_.findKey(json, o => o.name == 'Hue temperature sensor 1')].state.temperature;

        const temperature = {};
        temperature.temperature = {};
        
        let tempValue = tempInFaren*0.018+32;
        const tempUnit = "Farenheit." 

        temperature.temperature.value = tempValue;
        temperature.temperature.symbol = "°F";
        temperature.temperature.unit = tempUnit;
        temperature.temperature.alexaSpokenValue = "The current ambient temperature is " + Math.round(tempValue) + " degrees " + tempUnit;
        
        return temperature;
    }

    getLastMotionDetected(json){
        let result = _.findKey(json, o => o.name == 'Hue motion sensor');
        let lastMotionDetectedTimestamp = moment.utc(json[result].state.lastupdated).local().format('MM-DD hh:mm:ss a');
        moment().local();
        const timestamp = {};

        timestamp.movement = {};
        timestamp.movement.value = lastMotionDetectedTimestamp;        

        return timestamp;
    }
}

module.exports = router;