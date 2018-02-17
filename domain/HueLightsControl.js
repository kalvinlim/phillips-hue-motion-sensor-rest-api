'use strict';

const Promise = require("bluebird");
const rp = Promise.promisifyAll(require("request-promise"));
const request = require("request");
const _ = require('lodash');
const path    = require("path");
const config = require(path.normalize(__dirname + "/../config.js"));

class HueLightsControl {
    constructor(url) {
        this.url = config.baseUrl + '/groups';
    }

    getGroups(){
        const options = {
            uri: this.urls,
            json: true
        };

        return rp(options);
    }

    findGroupKey(json, groupName){
        let key = _.findKey(json, o => o.name == groupName);
        let bloom = json[key];
        console.log(key);
        console.log(bloom);
    }
}

module.exports =  HueLightsControl;