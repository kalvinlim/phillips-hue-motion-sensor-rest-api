'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const _ = require('lodash');
const moment = require('moment');
const path    = require("path");
const app = express();

const config = require(path.normalize(__dirname + "/../config.js"));


router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/../public/index.html'));
})

module.exports = router;