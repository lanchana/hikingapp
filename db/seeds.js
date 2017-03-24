var mongoose = require('mongoose');

require('dotenv').config()
mongoose.connect(process.env.MONGODB_URI);

var User = reqire('../models/user.js');
var Places = require('../models/places.js');
var Photos = require('../models/photos.js');

mongoose.Promise = global.Promise;

User.remove({}, (err) => {
    console.log(err);
});

Places.remove({}, (err) => {
    console.log(err);
});

Photos.remove({}, (err) => {
    console.log(err);
});