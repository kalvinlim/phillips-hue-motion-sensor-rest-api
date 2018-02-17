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
const path    = require("path");

const config = require(path.normalize(__dirname + "/../config.js"));

const CommandCenterLights = require(path.normalize(__dirname + '/../domain/CommandCenterLights.js'));
const HueLightsControl = require(path.normalize(__dirname + '/../domain/HueLightsControl.js'));

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/mood/gaming', (req, res) => {
    const hue = new HueLightsControl();
    const commandCenterLights = new CommandCenterLights();

    commandCenterLights.setBloom(true, 254, 43614, 254);
    commandCenterLights.setLightStrip(true, 254, 44381, 254);
    commandCenterLights.setCeilingLights(true, 51, 41442, 75);

    res.status(200).send();
});

router.get('/mood/movies', (req, res) => {
    const hue = new HueLightsControl();
    const commandCenterLights = new CommandCenterLights();

    commandCenterLights.setBloom(true, 254, 43614, 254);
    commandCenterLights.setLightStrip(true, 254, 44381, 254);
    commandCenterLights.setCeilingLights(false);

    res.status(200).send();
});

router.get('/mood/normal', (req, res) => {
    const hue = new HueLightsControl();
    const commandCenterLights = new CommandCenterLights();

    commandCenterLights.setBloom(true, 254, 43614, 254);
    commandCenterLights.setLightStrip(true, 254, 44381, 254);
    commandCenterLights.setCeilingLights(true, 254, 41442, 75);

    res.status(200).send();
});

router.get('/mood/off', (req, res) => {
    const hue = new HueLightsControl();
    const commandCenterLights = new CommandCenterLights();

    commandCenterLights.setBloom(false);
    commandCenterLights.setLightStrip(false);
    commandCenterLights.setCeilingLights(false);

    res.status(200).send();
});

module.exports = router;