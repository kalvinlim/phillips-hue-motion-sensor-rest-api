'use strict';

const Promise = require("bluebird");
const rp = Promise.promisifyAll(require("request-promise"));
const request = require("request");
const path    = require("path");
const _ = require('lodash');

const config = require(path.normalize(__dirname + "/../config.js"));

const HueLightsControl = require(path.normalize(__dirname + '/../domain/HueLightsControl.js'));
 
class CommandCenterLights {
    constructor() {
        this.url = `${config.baseUrl}/groups`;
        const hueLightsControl = new HueLightsControl();
        hueLightsControl.getGroups().then(json => {
            hueLightsControl.findGroupKey(json);
        });
        this.bloomKey = 5;
        this.lightStripKey = 3;
        this.ceilingLightsKey = 1;
    }

    setBloom(state, brightness, hue, sat){
        const options = {
            method: 'PUT',
            uri: `${this.url}/${this.bloomKey}/action`,
            body: {
                "on" : state,
                "bri" : brightness,
                "hue": hue,
                "sat": sat
            },
            json: true
        };
        
        return rp(options);
    }

    setLightStrip(state, brightness, hue, sat){
        const options = {
            method: 'PUT',
            uri: `${this.url}/${this.lightStripKey}/action`,
            body: {
                "on" : state,
                "bri" : brightness,
                "hue": hue,
                "sat": sat,
            },
            json: true
        };

        return rp(options);
    }

    setCeilingLights(state, brightness, hue, sat){
        const options = {
            method: 'PUT',
            uri: `${this.url}/${this.ceilingLightsKey}/action`,
            body: {
                "on" : state,
                "bri" : brightness,
                "hue": hue,
                "sat": sat
            },
            json: true
        };
        
        return rp(options);
    }
}

module.exports =  CommandCenterLights;