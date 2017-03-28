var mongoose = require('mongoose');

require('dotenv').config()
mongoose.connect(process.env.MONGODB_URI);

var User = require('../models/user.js');
var Places = require('../models/places.js');
var Photos = require('../models/photos.js');

// Use native promises
mongoose.Promise = global.Promise;

// This clears the database of existing user, places and photos before creating.
User.remove({}, (err) => {
    console.log(err);
});

Places.remove({}, (err) => {
    console.log(err);
});

Photos.remove({}, (err) => {
    console.log(err);
});