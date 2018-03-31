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

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
   var status = {status:'online'};
   res.status(200).json(status);
});

module.exports = router;