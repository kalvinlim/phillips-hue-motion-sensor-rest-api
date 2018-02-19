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

const FrontLight = require(path.normalize(__dirname + '/../domain/FrontLight.js'));
const HueLightsControl = require(path.normalize(__dirname + '/../domain/HueLightsControl.js'));

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/on', (req, res) => {
    const hue = new HueLightsControl();
    const frontLights = new FrontLight();

    frontLights.setOn();

    res.status(200).send();
});

router.get('/off', (req, res) => {
    const hue = new HueLightsControl();
    const frontLights = new FrontLight();

    frontLights.setOff();

    res.status(200).send();
});

module.exports = router;