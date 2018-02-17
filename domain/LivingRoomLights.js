'use strict';

const Promise = require("bluebird");
const rp = Promise.promisifyAll(require("request-promise"));
const request = require("request");
const path    = require("path");
const _ = require('lodash');

const config = require(path.normalize(__dirname + "/../config.js"));

class LivingRoomLights {
    constructor(url) {
        this.url = url;
        this.baseUrl = config.baseUrl+"/groups/";
    }

    setOn(groupKey){
        const options = {
            method: 'PUT',
            uri: this.baseUrl+groupKey+'/action',
            body: {
                "on" : true,
                "bri": 254,
                "hue": 8597,
                "sat": 121
            },
            json: true
        };
        
        return rp(options);
    }

    setOff(groupKey){
        const options = {
            method: 'PUT',
            uri: this.baseUrl+groupKey+'/action',
            body: {
                "on" : false
            },
            json: true
        };
        console.log(this.baseUrl+groupKey+'/action');
        return rp(options);
    }
}

module.exports = LivingRoomLights;