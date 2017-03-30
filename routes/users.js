var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Places = require('../models/places.js');
var Photos = require('../models/photos.js');
var authHelper = require('../helpers/auth.js');

// This gets the user login page
router.get('/', (req, res) => {
    User.find({})
    .exec((err, users) => {
        if(err) console.log(err);

        res.render('users/login', {
            users: users
        });
    });
});

// When you click on singnup button on login page this router will be called and redirect you to the signup page
router.get('/signup', (req, res) => {
    res.render('users/signup');
});

router.get('/galary', (req, res) => {
    User.find({})
    .exec((err, users) => {
        if(err) console.log(err);
         res.render('users/show', {
            user: users
         });
    });
});

// It call the helpers auth file to validate the user cradentials
router.get('/:id', authHelper.createSecure, (req, res) => {
    User.findById(req.params.id)
    .exec((err, user) => {
        // If you try to
        if(err) {
            res.send('Invalid username or password');
        }
        res.render('users/index.hbs', {
            // If if the user cratentials validated then this will call the index file
            user: user
        });
    })
});

// This router will be called while creating new user
router.post('/', authHelper.createSecure, (req, res) => {
    var query = { 'email' : req.body.email };

    User.findOne(query, function(err, item) {
        if(err) console.log(err);
        // This checks the new user details and adds only if the email id doest exist in the Database
        if(!item) {
            var user = new User({
                email: req.body.email,
                password: res.hashedPassword,
                username: req.body.username
            });
            user.save((err, user) => {
                if(err) console.log(err);
                res.render('users/login');
            })
        } else {
            res.render('users/signup');
        }
    });

});

module.exports = router;
