// This will access the photos schema and exports it
var Schema = require('../db/schema');
var mongoose = require('mongoose');

var Photos = Schema.Photos;
module.exports = Photos;