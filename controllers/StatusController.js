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

const HueLightsControl = require(path.normalize(__dirname + '/../domain/HueLightsControl.js'));

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    const hue = new HueLightsControl();
    hue.getGroups().then(json =>{
        let status = _.map(json, function(n){
            var state = n.state.any_on ? '[ON]' : 'off';
            console.log(n.name + " - " + state);
            return n.name + " : " + state;
        });

        res.status(200).send(status);
    })

    
});


module.exports = router;