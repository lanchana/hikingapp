const express = require('express');
const router = express.Router({mergeParams: true});
const mongoose = require('mongoose');
const Photos = require('../models/photos');
const Places = require('../models/places');
const User = require('../models/user');
const authHelper = require('../helpers/auth');

router.get('/new', (req, res) => {
    Places.findById(req.params.placesId)
    .exec((err, places) => {
        if(err) console.log(err);
        // user.list.findById(req.params.placesId)
        // .exec((err, places) => {
            // if(err) console.log(err);
            console.log("photos"+req.params.userId);
            res.render('photos/new', {
                places: places,
                userId: req.params.userId,
                placesId: req.params.placesId
            });
        // })
    });
});

router.post('/', (req, res) => {

    User.findOne({_id: req.params.userId}, function(err, data) {
        if (err) { res.json(false) }
        else {
            for (var i = 0; i < data.places.length; i++) {
                if(data.places[i]._id == req.params.placesId) {
                    data.places[i].photos.push({name: req.body.name, photo_url: req.body.photoUrl });                          }
                }
                User.update({_id: req.params.userId}, data, function(err, status) {
                if (err) { console.log('Error updating whole topic'); res.json(false) }
                else {
                    User.findOne({_id: req.params.userId}, function(err, data) {
                        if (err) {
                            console.log('Error finding comments');
                            res.json(status);
                        } else {
                            console.log('Success getting comments');
                            res.json(data);
                        }
                    })
                }
            });
            }
        });
})

module.exports = router;