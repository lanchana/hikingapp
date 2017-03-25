var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Places = require('../models/places.js');
var Photos = require('../models/photos.js');
var authHelper = require('../helpers/auth.js');


router.get('/', (req, res) => {
    User.find({})
    .exec((err, users) => {
        if(err) console.log(err);
        res.render('users/login', {
            users: users
        });
    });
});

router.get('/signup', (req, res) => {
    res.render('users/signup');
});

router.get('/:id', authHelper.createSecure, (req, res) => {
    User.findById(req.params.id)
    .exec((err, user) => {
        if(err) {
            res.send('Invalid username or password');
        }
        res.render('users/show.hbs', {
            user: user
        });
    })
})

router.post('/', authHelper.createSecure, (req, res) => {
    console.log(req.body.email);
 var query = { 'email' : req.body.email };
 User.findOne(query, function(err, item) {
            console.log(err);
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
            res.send('alread exists');
        }
        });

});

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
