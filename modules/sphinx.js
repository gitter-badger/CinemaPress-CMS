'use strict';

var mysql = require('mysql');

module.exports = mysql.createPool({localAddress: '127.0.0.1', port: '9306'});