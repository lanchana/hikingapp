// This will access the places schema from db and exports it
var Schema = require('../db/schema');
var mongoose = require('mongoose');

var Places = Schema.Places;
module.exports = Places;