'use strict';

const Promise = require("bluebird");
const rp = Promise.promisifyAll(require("request-promise"));
const request = require("request");
const path    = require("path");
const _ = require('lodash');

const config = require(path.normalize(__dirname + "/../config.js"));

const HueLightsControl = require(path.normalize(__dirname + '/../domain/HueLightsControl.js'));
 
class FrontLight {
    constructor(url) {
        this.url = config.baseUrl + '/groups/';
        const hueLightsControl = new HueLightsControl();
        hueLightsControl.getGroups().then(json => {
            hueLightsControl.findGroupKey(json);
        });
   
        this.frontLightsKey = 4;
    }

    setOn(){
        const options = {
            method: 'PUT',
            uri: this.url + this.frontLightsKey + '/action',
            body: {
                "on" : true,
                "bri" : 254,
            },
            json: true
        };
        
        return rp(options);
    }

    setOff(){
        const options = {
            method: 'PUT',
            uri: this.url + this.frontLightsKey + '/action',
            body: {
                "on" : false,
            },
            json: true
        };
        
        return rp(options);
    }
}

module.exports =  FrontLight;