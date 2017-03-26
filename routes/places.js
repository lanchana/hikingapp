const express = require('express');
const router = express.Router({mergeParams: true});
const mongoose = require('mongoose').set('debug', true);
const Places = require('../models/places.js');
const User = require('../models/user.js');
const authHelper = require('../helpers/auth.js');

router.get('/new', (req, res) => {
    console.log(req.params.userId);
    User.findById(req.params.userId)
    .exec((err, user) => {
        console.log('Places' + user);
        if(err) console.log(err);
        res.render('places/new', {
            user: user
        });
    });
});

router.delete('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.userId, {
        $pull: {
            places: {_id: req.params.id}
        }
    })
    .exec((err, deleted) => {
        if(err) console.log(err);
        res.redirect('/'+req.params.userId);
    })
})

router.post('/', (req, res) => {
    console.log(req.body.name);
    User.findById(req.params.userId)
    .exec((err, user) => {
        if(err) console.log(err);
        var newplace = new Places ({
            name: req.body.name,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            state: req.body.state,
            country: req.body.country,
            description: req.body.description
        });
        user.places.push(newplace);
        user.save((err) => {
            if(err) console.log(err);
            console.log('Place is added');
        });
        res.redirect('/'+req.params.userId);
    })
})

module.exports = router;
