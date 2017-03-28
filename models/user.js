// This will access the user schema from db and exports it
var Schema = require('../db/schema');
var mongoose = require('mongoose');

var User = Schema.User;
module.exports = User;