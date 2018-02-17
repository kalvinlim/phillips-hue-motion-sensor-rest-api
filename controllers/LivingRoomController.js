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

const LivingRoomLights = require(path.normalize(__dirname + '/../domain/LivingRoomLights.js'));
const HueLightsControl = require(path.normalize(__dirname + '/../domain/HueLightsControl.js'));

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/off', (req, res) => {
    const groupName = 'living room';
    const hue = new HueLightsControl();
    const livingRoomLights = new LivingRoomLights();

    let json = hue.getGroups()
        .then(body => {
            let groupKey = hue.findGroupKey(body, groupName);
            console.log("KEY: "+groupKey);
            livingRoomLights.setOff(groupKey);
            res.status(200).send();
        });
});

router.get('/on', (req, res) => {
    const groupName = 'living room';
    const hue = new HueLightsControl();
    const livingRoomLights = new LivingRoomLights();

    let json = hue.getGroups()
        .then(body => {
            let groupKey = hue.findGroupKey(body, groupName);
            livingRoomLights.setOn(groupKey);
            res.status(200).send();
        });
});


module.exports = router;